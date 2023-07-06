import { createContext, useState, useEffect, useContext, useRef } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
// import { addUserToACList } from "../utils/add-to-active-campaign-list";
import axios from "axios";
const Context = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.user());
  const [isLoading, setIsLoading] = useState(true);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showNoUserError, setShowNoUserError] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [signUpAsset, setSignUpAsset] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshUser, setRefreshUser] = useState(false);
  const router = useRouter();
  const renderCount = useRef(0);

  const directToLogin = !!user && !user.is_subscribed;
  const directToSignUp = !user;
  // Password reset
  useEffect(() => {
    setRefreshUser(false);
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();
      const session = supabase.auth.session();

      if (sessionUser) {
        let profile;
        // Get profile data
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();
        profile = data;
        if (error) {
          console.log(error);
        }
        // strip out first and last name and save in profile
        if (
          !profile.is_ac_client &&
          sessionUser.app_metadata.provider !== "email"
        ) {
          const fullName = session.user.user_metadata.full_name.split(" ");
          const firstName = fullName[0];
          const lastName = fullName[1];
          const email = session.user.email;

          updateUserName(email, firstName, lastName);

          const { data } = await supabase
            .from("profile")
            .select("*")
            .eq("id", sessionUser.id)
            .single();
          profile = data;
        }

        setUser({
          ...sessionUser,
          ...profile,
          session,
        });
      }

      setIsLoading(false);
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, [refreshUser]);

  useEffect(() => {
    const runMe = async () => {
      const checkForPasswordReset = async () => {
        const parsedHash = new URLSearchParams(
          window.location.hash.substr(1) // skip the first char (#)
        );
        if (parsedHash.get("type") === "recovery") {
          return (token = parsedHash.get("access_token"));
        }
      };
      const token = await checkForPasswordReset();
      if (token) {
        setToken(token);
        setShowResetPasswordModal(true);
        router.push(`/`);
      }
    };
    runMe();
  }, []);

  useEffect(() => {
    // This if statement is to prevent a 500 error on logout() where there is no session variable
    // I forced this to work. I'm not comfortable with this because I don't know why the error started occuring
    // TODO: Determine the cause of this error.
    if (supabase.auth.session()) {
      axios.post("/api/set-supabase-cookie", {
        event: user ? "SIGNED_IN" : "SIGNED_OUT",
        session: supabase.auth.session(),
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      const subscription = supabase
        .from(`profile:id=eq.${user.id}`)
        .on("UPDATE", (payload) => {
          setIsLoading({ ...user, ...payload.new });
        })
        .subscribe();

      return () => {
        supabase.removeSubscription(subscription);
      };
    }
  }, []);

  const updateUserFirstName = async (email, firstName) => {
    const { data, error } = await axios.get(
      `/api/update_user_first_name/${email}/${firstName}`
    );
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const logout = async () => {
    document.cookie = `signUpAssetID=''; max-age=0`;
    const { user, session, error } = await supabase.auth.signOut();
    setUser(null);
    if (error) {
      console.log(error.message);
    }
    router.push("/");
  };

  const login = async (
    loginProvider,
    email = "",
    password = "",
    firstName = "",
    lastName = " ",
    directionText = ""
  ) => {
    if (loginProvider === "email") {
      setShowNoUserError(false);
      // Route to proper supabase function. If user exists in the profile table then direct to signIn
      const { data } = await axios.get(`/api/confirm-user/${email}`);

      directToSignUp = !data;
      directToLogin = data;
      if (directToSignUp && directionText === "Sign In") {
        setShowNoUserError(true);
        return false;
      }
      if (directToSignUp) {
        const { user, session, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) {
          alert(error);
          console.log(error);
        }
        updateUserFirstName(email, firstName);
        // Handle attributing asset to user sign up
        if (signUpAsset) {
          router.push(`/pricing?aid=${signUpAsset}`);
        } else {
          router.push("/pricing");
        }
      } else if (directToLogin) {
        setShowPasswordError(false);

        const { user, session, error } = await supabase.auth.signIn({
          email: email,
          password: password,
        });
        if (error) {
          setShowPasswordError(true);
          console.log(error);
        } else {
          router.push("/route");
        }
      }
    } else {
      await supabase.auth.signIn(
        {
          provider: loginProvider,
        },
        { redirectTo: process.env.NEXT_PUBLIC_CLIENT_ROUTE }
      );
    }
  };

  const exposed = {
    user,
    setUser,
    login,
    logout,
    isLoading,
    setIsLoading,
    showPasswordError,
    setShowPasswordError,
    showNoUserError,
    setShowNoUserError,
    showResetPasswordModal,
    setShowResetPasswordModal,
    token,
    signUpAsset,
    setSignUpAsset,
    setRefreshUser,
    // getUserProfile,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
