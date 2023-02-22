import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";

export default function Login() {
  const { signup } = useUser();
  const [firstName, setFirstName] = useState("");
  const [firstNameLengthMessage, setFirstNameLengthMessage] = useState("");
  const [firstNameLengthGood, setFirstNameLengthGood] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameLengthMessage, setLastNameLengthMessage] = useState("");
  const [lastNameLengthGood, setLastNameLengthGood] = useState(false);
  const [email, setEmail] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState(null);
  const [passwordLengthGood, setPasswordLengthGood] = useState(false);
  const [passwordLengthMessage, setPasswordLengthMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [emailGood, setEmailGood] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    // Handle form validation
    const formValidation = () => {
      // console.log("Form Validating");
      if (
        firstNameLengthGood &&
        lastNameLengthGood &&
        emailGood &&
        passwordLengthGood &&
        passwordMatch
      ) {
        // console.log("Form is Valid");
        setFormValid(true);
      } else {
        //   if (!firstNameLengthGood) {
        //     setFirstNameLengthMessage("Please enter your first name.");
        //   }
        //   if (!lastNameLengthGood) {
        //     setLastNameLengthMessage("Please enter your last name.");
        //   }
        //   if (!emailGood) {
        //     setEmailErrorMessage("Please enter a valid email address.");
        //   }
        //   if (!passwordLengthGood) {
        //     setPasswordLengthMessage("Password must be at least 8 characters.");
        //   }
        //   if (!passwordMatch) {
        //     setPasswordMatchMessage("Must match the password you entered above.");
        //   }
        // console.log("Form is NOT Valid");
        setFormValid(false);
      }
    };
    formValidation();
  }, [
    firstNameLengthGood,
    lastNameLengthGood,
    emailGood,
    passwordLengthGood,
    passwordMatch,
  ]);

  const handleFirstName = (val) => {
    setFirstName(val);
    if (val.length > 0) {
      setFirstNameLengthMessage("");
      setFirstNameLengthGood(true);
    } else {
      setFirstNameLengthMessage("Please enter your first name.");
      setFirstNameLengthGood(false);
    }
    // formValidation();
  };

  const handleLastName = (val) => {
    setLastName(val);
    if (val.length > 0) {
      setLastNameLengthMessage("");
      setLastNameLengthGood(true);
    } else {
      setLastNameLengthMessage("Please enter your last name.");
      setLastNameLengthGood(false);
    }
    // formValidation();
  };

  const handleEmail = (val) => {
    setIsDirty(true);
    setEmail(val);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
      setEmailErrorMessage("");
      setEmailGood(true);
    } else {
      setEmailErrorMessage("Please enter a valid email address.");
      setEmailGood(false);
    }
    // formValidation();
  };

  const handlePassword = (val) => {
    setIsDirty(true);
    setPassword(val);
    const passwordLength = val.length;

    if (passwordLength >= 8) {
      setPasswordLengthMessage("");
      setPasswordLengthGood(true);
    } else {
      setPasswordLengthMessage("Password must be at least 8 characters.");
      setPasswordLengthGood(false);
    }
    // formValidation();
  };

  const handlePasswordValidation = (val) => {
    if (password != val) {
      setPasswordMatchMessage("Must match the password you entered above.");
      setPasswordMatch(false);
    } else {
      setPasswordMatchMessage("");
      setPasswordMatch(true);
    }
    // formValidation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signUp = signup(email, password, firstName, lastName);
    if (!signUp) {
      setLoginError(true);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-fossilOcean">
                Join the <span className="italic">&quot;Om Is Home&quot;</span>{" "}
                Family
              </h2>
              {/* <p>First Name Good: {firstNameLengthGood.toString()}</p>
              <p>Last Name Good: {lastNameLengthGood.toString()}</p>
              <p>Email Good: {emailGood.toString()}</p>
              <p>Password Good: {passwordLengthGood.toString()}</p>
              <p>Password Match: {passwordMatch.toString()}</p>
              <p>Form Valid: {formValid.toString()}</p> */}
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-fossilOcean"
                    >
                      First Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="firstName"
                        name="firstName"
                        type="firstName"
                        autoComplete="firstName"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-fossilOceanHover sm:text-sm"
                        onChange={(e) => {
                          handleFirstName(e.target.value);
                        }}
                      />
                    </div>
                    <p className="text-red-500 text-xs">
                      {firstNameLengthMessage}{" "}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-fossilOcean"
                    >
                      Last Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="lastName"
                        name="lastName"
                        type="lastName"
                        autoComplete="v"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-fossilOceanHover sm:text-sm"
                        onChange={(e) => {
                          handleLastName(e.target.value);
                        }}
                      />
                    </div>
                    <p className="text-red-500 text-xs">
                      {lastNameLengthMessage}{" "}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-fossilOcean"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-fossilOceanHover sm:text-sm"
                        onChange={(e) => {
                          handleEmail(e.target.value);
                        }}
                      />
                    </div>
                    <p className="text-red-500 text-xs">{emailErrorMessage} </p>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-fossilOcean"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-fossilOceanHover sm:text-sm"
                        onChange={(e) => {
                          handlePassword(e.target.value);
                        }}
                      />
                    </div>
                    <p className="text-red-500 text-xs">
                      {passwordLengthMessage}{" "}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-fossilOcean"
                    >
                      Re-Enter Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="passwordCheck"
                        name="passwordCheck"
                        type="password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-fossilOceanHover sm:text-sm"
                        onChange={(e) => {
                          handlePasswordValidation(e.target.value);
                        }}
                      />
                    </div>
                    <p className="text-red-500 text-xs">
                      {passwordMatchMessage}
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="flex w-full disabled:bg-fossilDisabled justify-center rounded-md border border-transparent bg-fossilOcean py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-fossilOceanHover focus:outline-none focus:ring-2 focus:ring-fossilOceanHover focus:ring-offset-2"
                      onClick={(e) => handleSubmit(e)}
                      disabled={!formValid}
                    >
                      Join Us
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="fossilOcean.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
