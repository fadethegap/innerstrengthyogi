import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";

export default function Login() {
  const { signin } = useUser();
  // const [firstName, setFirstName] = useState(null)
  // const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [emailGood, setEmailGood] = useState(false);
  const [passwordLengthGood, setPasswordLengthGood] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    formValidation();
  }, [emailGood, passwordLengthGood]);

  const handleEmail = (val) => {
    setIsDirty(true);
    setEmail(val);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
      setEmailGood(true);
    } else {
      setEmailGood(false);
    }
    // formValidation();
  };

  const handlePassword = (val) => {
    setIsDirty(true);
    setPassword(val);
    const passwordLength = val.length;

    if (passwordLength >= 8) {
      setPasswordLengthGood(true);
    } else {
      setPasswordLengthGood(false);
    }
    // formValidation();
  };

  // Handle form validation
  const formValidation = () => {
    if (emailGood && passwordLengthGood) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = () => {
    event.preventDefault();
    const signIn = signin(email, password);
    if (!signIn) {
      setLoginError(true);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-fossilOcean">
                Sign in to your account
              </h2>
              {/* <p>Email Good: {emailGood.toString()}</p>
              <p>Password Good: {passwordLengthGood.toString()}</p>
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
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">{/*  */}</div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-fossilOcean hover:text-fossilOceanHover"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="flex w-full disabled:bg-fossilDisabled justify-center rounded-md border border-transparent bg-fossilOcean py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-fossilOceanHover focus:outline-none focus:ring-2 focus:ring-fossilOceanHover focus:ring-offset-2"
                      onClick={handleSubmit}
                      disabled={!formValid}
                    >
                      Sign in
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
