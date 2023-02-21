import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(supabase.auth.user());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();
      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({
          ...sessionUser,
          ...profile,
        });
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });

    setIsLoading(false);
  }, []);

  // const login = async () => {
  //   supabase.auth.signIn({ provider: "github" });
  // };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    return {};
  };

  const signup = async (email, password, firstName, lastName) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("USER IN CONTEXT", user);
      console.log("FIRST NAME AND LAST", firstName, lastName);
      const { data, error } = await supabase
        .from("profile")
        .update({ first_name: firstName, last_name: lastName })
        .eq("id", user.id);
    }
    router.push("/");
  };

  const signin = async (email, password) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      return false;
    }
    router.push("/");
  };

  const exposed = {
    user,
    logout,
    signup,
    signin,
    isLoading,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
