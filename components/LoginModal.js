// import { Fragment, useEffect, useState } from "react";
// import { supabase, getServiceSupabase } from "../utils/supabase";
// import { useUser } from "../context/user";
// import Link from "next/link";
// import { Dialog, Transition } from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/outline";
// import { useRouter } from "next/router";
// import Router from "next/router";
// import axios from "axios";
// import { AiOutlineClose, AiFillCheckCircle } from "react-icons/ai";
// import { FaRegThumbsUp } from "react-icons/fa";
// import { MdMarkEmailRead } from "react-icons/md";
// import { BsFillCheckCircleFill } from "react-icons/bs";
// import { getCookie } from "../utils/cookies";

// const LoginModal = ({
//   showSignupFields,
//   showLoginModal,
//   setShowLoginModal,
//   emailGoodMessage,
//   setEmailGoodMessage,
//   showWelcomeModal,
//   setShowWelcomeModal,
// }) => {
//   const {
//     user,
//     // setUser,
//     login,
//     showPasswordError,
//     showNoUserError,
//     setShowNoUserError,
//     showResetPasswordModal,
//     setShowResetPasswordModal,
//     // token,
//     isLoading,
//     // getUserProfile,
//   } = useUser();

//   console.log("ShowLoginModal", showLoginModal);

//   const router = useRouter();
//   const [noUserMessage, setNoUserMessage] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [emailExists, setEmailExists] = useState(false);
//   const [emailGood, setEmailGood] = useState(false);
//   const [showNoEmailMessage, setShowNoEmailMessage] = useState(false);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [showPasswordResetSuccessMessage, setShowPasswordResetSuccessMessage] =
//     useState(false);
//   const [noEmailMessage, setNoEmailMessage] = useState("");
//   const [passwordLengthMessage, setPasswordLengthMessage] = useState("");
//   const [firstNameLengthMessage, setFirstNameLengthMessage] = useState("");
//   const [lastNameLengthMessage, setLastNameLengthMessage] = useState("");
//   const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
//   const [passwordMatch, setPasswordMatch] = useState(false);
//   const [passwordLengthGood, setPasswordLengthGood] = useState(false);
//   const [passwordError, setPasswordError] = useState(showPasswordError);
//   const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");
//   const [firstNameLengthGood, setFirstNameLengthGood] = useState(false);
//   const [lastNameLengthGood, setLastNameLengthGood] = useState(false);
//   const [showReqPasswordChangeModal, setShowReqPasswordChangeModal] =
//     useState(false);

//   // Handle correlating asset id with user signup
//   useEffect(() => {
//     const subscriptionAssetID = getCookie("signUpAssetID");
//     if (user && subscriptionAssetID) {
//       axios.post("/api/correlate-subscription-asset", {
//         assetID: subscriptionAssetID,
//         userID: user.id,
//       });
//     }
//   }, []);

//   const handleReqPasswordChange = async () => {
//     setShowNoEmailMessage(false);
//     if (emailGood) {
//       // Ensure the email is in the profile table
//       // Returns a bool
//       const { data } = await axios.get(`/api/confirm-user/${email}`);
//       if (!data) {
//         setNoEmailMessage(`${email} is not in our system`);
//         setShowNoEmailMessage(true);
//       } else {
//         setShowSuccessMessage(true);
//         const { data, error } = await supabase.auth.api.resetPasswordForEmail(
//           email
//         );
//       }
//     }
//   };

//   const handlePasswordChange = async () => {
//     if (validation()) {
//       setShowPasswordResetSuccessMessage(true);
//       const { error, data } = await supabase.auth.api.updateUser(token, {
//         password: password,
//       });
//       if (error) {
//         console.log(error);
//       }
//       router.push("/");
//     }
//   };

//   let directionText = "Sign In";
//   let showDoublePassword = false;
//   let showForgotPassword = true;
//   let showFirstAndLastName = false;
//   let showFirstName = false;
//   let showLastName = false;
//   // Handle new user
//   if (showSignupFields || showNoUserError) {
//     directionText = "Sign Up";
//     showFirstName = true;
//     showDoublePassword = true;
//     showForgotPassword = false;
//   }

//   useEffect(() => {
//     if (!isLoading) {
//       if (showPasswordError) {
//         setInvalidPasswordMessage("Invalid Password");
//         setShowLoginModal(true);
//       }
//     }
//   }, [showPasswordError]);

//   useEffect(() => {
//     if (showNoUserError) {
//       setNoUserMessage("No user with that email. Sign Up here.");
//       setShowLoginModal(true);
//     }
//   }, [showNoUserError]);

//   const handleSubmit = () => {
//     event.preventDefault();

//     if (validation()) {
//       setShowLoginModal(false);
//       setNoUserMessage("");
//       addUserToACList(email, firstName, 43, "email-ccpro-registration");
//       login("email", email, password, firstName, lastName, directionText);
//     }
//   };

//   const handleAuthSignIn = (provider) => {
//     login(provider);
//   };

//   const handlePasswordEntry = (val) => {
//     setPassword(val);
//     setInvalidPasswordMessage("");
//     const passwordLength = val.length;

//     if (passwordLength >= 8) {
//       setPasswordLengthMessage("");
//       setPasswordLengthGood(true);
//     } else {
//       setPasswordLengthMessage("Password must be at least 8 characters.");
//       setPasswordLengthGood(false);
//     }
//   };

//   const handleFirstNameEntry = (val) => {
//     setFirstName(val);

//     if (val.length > 0 && val.trim() == "") {
//       setFirstNameLengthMessage("Something we can pronounce please.");
//       setFirstNameLengthGood(false);
//     } else if (val.length > 0) {
//       setFirstNameLengthMessage("");
//       setFirstNameLengthGood(true);
//     } else {
//       setFirstNameLengthMessage("Please enter your first name.");
//       setFirstNameLengthGood(false);
//     }
//   };

//   const handleLastNameEntry = (val) => {
//     setLastName(val);
//     if (val.length > 0) {
//       setLastNameLengthMessage("");
//       setLastNameLengthGood(true);
//     } else {
//       setLastNameLengthMessage("Please enter your last name.");
//       setLastNameLengthGood(false);
//     }
//   };

//   const handleEmailEntry = (val) => {
//     setEmail(val);
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
//       setEmailGood(true);
//       setEmailGoodMessage("");
//     } else {
//       setEmailGood(false);
//       setEmailGoodMessage("Please enter a valid email address.");
//     }
//   };

//   const handlePasswordValidation = (val) => {
//     if (password != val) {
//       setPasswordMatchMessage("Must match the password you entered above.");
//       setPasswordMatch(false);
//     } else {
//       setPasswordMatchMessage("");
//       setPasswordMatch(true);
//     }
//   };

//   const user_exists = async (email) => {
//     const { data, error } = await axios.get(`/api/confirm-user/${email}`);
//     if (error) {
//       console.log(error);
//     } else {
//       return data;
//     }
//   };

//   const validation = () => {
//     if (showLoginModal && showSignupFields) {
//       if (
//         firstNameLengthGood &&
//         // lastNameLengthGood &&
//         emailGood &&
//         passwordLengthGood &&
//         passwordMatch
//       ) {
//         return true;
//       } else {
//         if (!firstNameLengthGood) {
//           setFirstNameLengthMessage("Please enter your first name.");
//         }
//         // if (!lastNameLengthGood) {
//         //   setLastNameLengthMessage('Please enter your last name.')
//         // }
//         if (!emailGood) {
//           setEmailGoodMessage("Please enter a valid email address.");
//         }
//         if (!passwordLengthGood) {
//           setPasswordLengthMessage("Password must be at least 8 characters.");
//         }
//         if (!passwordMatch) {
//           setPasswordMatchMessage("Must match the password you entered above.");
//         }
//         return false;
//       }
//     } else if (showLoginModal) {
//       if (emailGood && passwordLengthGood) {
//         return true;
//       } else {
//         if (!emailGood) {
//           setEmailGoodMessage("Please enter a valid email address.");
//         }
//         if (!passwordLengthGood) {
//           setPasswordLengthMessage("Password must be at least 8 characters.");
//         }
//         return false;
//       }
//     }
//     if (showReqPasswordChangeModal) {
//       if (emailGood && passwordLengthGood) {
//         return true;
//       } else {
//         if (!emailGood) {
//           setEmailGoodMessage("Please enter a valid email address.");
//         }
//         if (!passwordLengthGood) {
//           setPasswordLengthMessage("Password must be at least 8 characters.");
//         }
//         return false;
//       }
//     }
//     if (showResetPasswordModal) {
//       if (passwordLengthGood) {
//         return true;
//       } else {
//         if (!passwordLengthGood) {
//           setPasswordLengthMessage("Password must be at least 8 characters.");
//         }
//         return false;
//       }
//     }
//   };

//   const keepOpen = () => {
//     if (showLoginModal) {
//       setShowLoginModal(true);
//     }
//     if (showReqPasswordChangeModal) {
//       setShowReqPasswordChangeModal(true);
//     }
//     if (showResetPasswordModal) {
//       setShowResetPasswordModal(true);
//     }
//   };

//   const handleClose = () => {
//     // getUserProfile()
//     setShowNoUserError(false);
//     setNoUserMessage("");
//     setShowLoginModal(false);
//     setShowReqPasswordChangeModal(false);
//     setShowResetPasswordModal(false);
//     setShowWelcomeModal(false);
//   };

//   const handlePasswordResetClose = () => {
//     setShowResetPasswordModal(false);
//   };

//   const handleShowReqPasswordChangeModal = () => {
//     setShowLoginModal(false);
//     setShowReqPasswordChangeModal(true);
//   };

//   return (
//     <>
//       <>
//         <Transition.Root show={showLoginModal} as={Fragment}>
//           <Dialog
//             as="div"
//             className="fixed inset-0 z-10 overflow-y-auto"
//             onClose={keepOpen}
//           >
//             <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0"
//                 enterTo="opacity-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//               >
//                 <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//               </Transition.Child>

//               {/* This element is to trick the browser into centering the modal contents. */}
//               <span
//                 className="hidden sm:inline-block sm:h-screen sm:align-middle"
//                 aria-hidden="true"
//               >
//                 &#8203;
//               </span>
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               >
//                 <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
//                   <div>
//                     <div className="grid justify-items-end">
//                       <AiOutlineClose
//                         className="h-6 w-6 cursor-pointer text-gray-400"
//                         onClick={() => handleClose()}
//                       />
//                     </div>
//                     <div className="mt-3 text-center sm:mt-5">
//                       <Dialog.Title
//                         as="h3"
//                         className="text-lg font-medium leading-6 text-gray-900"
//                       >
//                         {directionText}
//                         {emailExists && (
//                           <div className="text-xs text-indigo-500">
//                             An account with this email already exists.
//                           </div>
//                         )}
//                       </Dialog.Title>
//                       <span className="text-xs text-red-400">
//                         {noUserMessage}
//                       </span>
//                     </div>
//                     {showFirstName && (
//                       <>
//                         <div className="relative mt-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-1 focus:border-indigo-500 focus:ring-indigo-500">
//                           <label
//                             htmlFor="email"
//                             className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
//                           >
//                             First Name
//                           </label>
//                           <input
//                             type="text"
//                             name="firstName"
//                             id="firstName"
//                             className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                             // placeholder="jane@email.com"
//                             onChange={(e) =>
//                               handleFirstNameEntry(e.target.value)
//                             }
//                           />
//                         </div>
//                         <span className="text-xs text-red-400">
//                           {firstNameLengthMessage}
//                         </span>
//                       </>
//                     )}
//                     {showLastName && (
//                       <>
//                         <div className="relative mt-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-1 focus:border-indigo-500 focus:ring-indigo-500">
//                           <label
//                             htmlFor="email"
//                             className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
//                           >
//                             Last Name
//                           </label>
//                           <input
//                             type="text"
//                             name="lastName"
//                             id="lastName"
//                             className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                             // placeholder="jane@email.com"
//                             onChange={(e) =>
//                               handleLastNameEntry(e.target.value)
//                             }
//                           />
//                         </div>
//                         <span className="text-xs text-red-400">
//                           {lastNameLengthMessage}
//                         </span>
//                       </>
//                     )}
//                     <div className="relative mt-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-1 focus:border-indigo-500 focus:ring-indigo-500">
//                       <label
//                         htmlFor="email"
//                         className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
//                       >
//                         Email
//                       </label>
//                       <input
//                         type="text"
//                         name="email"
//                         id="email"
//                         className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                         // placeholder="jane@email.com"
//                         onChange={(e) => handleEmailEntry(e.target.value)}
//                       />
//                     </div>
//                     <span className="text-xs text-red-400">
//                       {emailGoodMessage}
//                     </span>
//                     <div className="relative mt-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-1 focus:border-indigo-500 focus:ring-indigo-500">
//                       <label
//                         htmlFor="password"
//                         className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
//                       >
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         name="password"
//                         id="password"
//                         className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                         placeholder=""
//                         onChange={(e) => handlePasswordEntry(e.target.value)}
//                       />
//                     </div>
//                     <span className="text-xs text-red-400">
//                       {passwordLengthMessage}
//                       {invalidPasswordMessage}
//                     </span>
//                     {showDoublePassword && (
//                       <>
//                         <div className="relative mt-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-1 focus:border-indigo-500 focus:ring-indigo-500">
//                           <label
//                             htmlFor="password"
//                             className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
//                           >
//                             Re-enter Password
//                           </label>
//                           <input
//                             type="password"
//                             name="passwordTest"
//                             id="passwordTest"
//                             className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                             placeholder=""
//                             onChange={(e) => {
//                               handlePasswordValidation(e.target.value);
//                             }}
//                           />
//                         </div>
//                         <span className="text-xs text-red-400">
//                           {passwordMatchMessage}
//                         </span>
//                       </>
//                     )}
//                     <div className="mt-2 flex items-center justify-between">
//                       {showForgotPassword && (
//                         <div className="text-sm">
//                           <span
//                             className="font-medium text-gray-400 hover:text-gray-500"
//                             onClick={() => handleShowReqPasswordChangeModal()}
//                           >
//                             Forgot your password?
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <div
//                         className="mt-3 flex w-full justify-center rounded-full border bg-emerald-600 px-4 py-2 text-center text-sm tracking-wider text-white shadow-sm hover:bg-emerald-700 focus:outline-none"
//                         onClick={() => handleSubmit()}
//                       >
//                         {directionText}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="relative mt-7">
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="w-full border-t border-gray-300" />
//                     </div>
//                     <div className="relative flex justify-center text-sm">
//                       <span className="bg-white px-2 text-gray-500">Or</span>
//                     </div>
//                   </div>
//                   <div className="mt-3 sm:mt-6">
//                     <button
//                       type="button"
//                       className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-base font-medium text-gray-500 shadow-sm hover:bg-gray-400 hover:text-gray-100 focus:outline-none  sm:text-sm"
//                       onClick={() => handleAuthSignIn("google")}
//                     >
//                       <div className="mx-auto flex h-8  items-center justify-center rounded-full">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 48 48"
//                           width="30px"
//                           height="30px"
//                         >
//                           <path
//                             fill="#FFC107"
//                             d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
//                           />
//                           <path
//                             fill="#FF3D00"
//                             d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
//                           />
//                           <path
//                             fill="#4CAF50"
//                             d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
//                           />
//                           <path
//                             fill="#1976D2"
//                             d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
//                           />
//                         </svg>
//                         <div className="pl-7">{directionText} with Google</div>
//                       </div>
//                     </button>
//                     {/* <button
//                       type="button"
//                       className="mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-base font-medium text-gray-500 shadow-sm hover:bg-gray-400 hover:text-gray-100  focus:outline-none sm:text-sm"
//                       onClick={() => handleAuthSignIn('facebook')}
//                     >
//                       <div className="mx-auto flex h-8  items-center justify-center rounded-full">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 48 48"
//                           width="30px"
//                           height="30px"
//                         >
//                           <linearGradient
//                             id="awSgIinfw5_FS5MLHI~A9a"
//                             x1="6.228"
//                             x2="42.077"
//                             y1="4.896"
//                             y2="43.432"
//                             gradientUnits="userSpaceOnUse"
//                           >
//                             <stop offset="0" stopColor="#0d61a9" />
//                             <stop offset="1" stopColor="#16528c" />
//                           </linearGradient>
//                           <path
//                             fill="url(#awSgIinfw5_FS5MLHI~A9a)"
//                             d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"
//                           />
//                           <path
//                             d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z"
//                             opacity=".05"
//                           />
//                           <path
//                             d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z"
//                             opacity=".07"
//                           />
//                           <path
//                             fill="#fff"
//                             d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"
//                           />
//                         </svg>
//                         <div className="pl-3">
//                           {directionText} with Facebook
//                         </div>
//                       </div>
//                     </button> */}
//                   </div>
//                 </div>
//               </Transition.Child>
//             </div>
//           </Dialog>
//         </Transition.Root>
//       </>
//       <>
//         <Transition.Root show={showReqPasswordChangeModal} as={Fragment}>
//           {!showSuccessMessage ? (
//             <Dialog
//               as="div"
//               className="fixed inset-0 z-10 overflow-y-auto"
//               onClose={keepOpen}
//             >
//               <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0"
//                   enterTo="opacity-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100"
//                   leaveTo="opacity-0"
//                 >
//                   <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 {/* This element is to trick the browser into centering the modal contents. */}
//                 <span
//                   className="hidden sm:inline-block sm:h-screen sm:align-middle"
//                   aria-hidden="true"
//                 >
//                   &#8203;
//                 </span>
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                   enterTo="opacity-100 translate-y-0 sm:scale-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                   leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 >
//                   <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
//                     <div>
//                       <div className="grid justify-items-end">
//                         <AiOutlineClose
//                           className="h-6 w-6 cursor-pointer text-gray-400"
//                           onClick={() => handleClose()}
//                         />
//                       </div>
//                       <div className="mt-3 text-center sm:mt-5">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-lg font-medium leading-6 text-gray-900"
//                         >
//                           Enter your email
//                         </Dialog.Title>
//                       </div>

//                       <div className="relative mt-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-1 focus:border-indigo-500 focus:ring-indigo-500">
//                         <label
//                           htmlFor="email"
//                           className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
//                         >
//                           Email
//                         </label>
//                         <input
//                           type="text"
//                           name="email"
//                           id="email"
//                           className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                           // placeholder="jane@email.com"
//                           onChange={(e) => handleEmailEntry(e.target.value)}
//                         />
//                       </div>
//                       <span className="text-xs text-red-400">
//                         {noEmailMessage}
//                       </span>

//                       <div className="mt-2 flex items-center justify-between"></div>

//                       <div>
//                         <div
//                           className="mt-3 flex w-full justify-center rounded-full border bg-emerald-600 px-4 py-2 text-center text-sm tracking-wider text-white shadow-sm hover:bg-emerald-700 focus:outline-none"
//                           onClick={() => handleReqPasswordChange()}
//                         >
//                           Send Email
//                         </div>
//                       </div>
//                     </div>
//                     <div className="relative mt-7">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-300" />
//                       </div>
//                       <div className="relative flex justify-center text-sm">
//                         <span className="bg-white px-2 text-gray-500">
//                           We will send you a verification email
//                         </span>
//                       </div>
//                     </div>

//                     <div className="mt-3 flex justify-center text-xs text-gray-400">
//                       (Make sure to check your spam folder)
//                     </div>
//                   </div>
//                 </Transition.Child>
//               </div>
//             </Dialog>
//           ) : (
//             <Dialog
//               as="div"
//               className="fixed inset-0 z-10 overflow-y-auto"
//               onClose={keepOpen}
//             >
//               <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0"
//                   enterTo="opacity-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100"
//                   leaveTo="opacity-0"
//                 >
//                   <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 {/* This element is to trick the browser into centering the modal contents. */}
//                 <span
//                   className="hidden sm:inline-block sm:h-screen sm:align-middle"
//                   aria-hidden="true"
//                 >
//                   &#8203;
//                 </span>
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                   enterTo="opacity-100 translate-y-0 sm:scale-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                   leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 >
//                   <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
//                     <div>
//                       <div className="grid justify-items-end">
//                         <AiOutlineClose
//                           className="h-6 w-6 cursor-pointer text-gray-400"
//                           onClick={() => handleClose()}
//                         />
//                       </div>
//                       <div className="mt-3 text-center sm:mt-5">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-lg font-medium leading-6 text-gray-900"
//                         >
//                           <div className="grid justify-items-center  ">
//                             <MdMarkEmailRead className="text-5xl text-emerald-600 " />
//                             <span className="mt-5 text-sm text-gray-400">
//                               Check your email for a password reset link
//                             </span>
//                             <span className="mt-5 text-xs text-gray-400">
//                               (Make sure to check your spam folder...)
//                             </span>
//                           </div>
//                         </Dialog.Title>
//                       </div>
//                     </div>
//                   </div>
//                 </Transition.Child>
//               </div>
//             </Dialog>
//           )}
//         </Transition.Root>
//       </>

//       <>
//         <Transition.Root show={showResetPasswordModal} as={Fragment}>
//           {!showPasswordResetSuccessMessage ? (
//             <Dialog
//               as="div"
//               className="fixed inset-0 z-10 overflow-y-auto"
//               onClose={keepOpen}
//             >
//               <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0"
//                   enterTo="opacity-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100"
//                   leaveTo="opacity-0"
//                 >
//                   <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 {/* This element is to trick the browser into centering the modal contents. */}
//                 <span
//                   className="hidden sm:inline-block sm:h-screen sm:align-middle"
//                   aria-hidden="true"
//                 >
//                   &#8203;
//                 </span>
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                   enterTo="opacity-100 translate-y-0 sm:scale-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                   leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 >
//                   <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
//                     <div>
//                       <div className="grid justify-items-end">
//                         <AiOutlineClose
//                           className="h-6 w-6 cursor-pointer text-gray-400"
//                           onClick={() => handlePasswordResetClose()}
//                         />
//                       </div>
//                       <div className="mt-3 text-center sm:mt-5">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-lg font-medium leading-6 text-gray-900"
//                         >
//                           Enter your new password
//                         </Dialog.Title>
//                       </div>

//                       <div className="relative mt-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-1 focus:border-indigo-500 focus:ring-indigo-500">
//                         <label
//                           htmlFor="password"
//                           className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
//                         >
//                           Password
//                         </label>
//                         <input
//                           type="password"
//                           name="password"
//                           id="password"
//                           className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                           placeholder=""
//                           onChange={(e) => handlePasswordEntry(e.target.value)}
//                         />
//                       </div>
//                       <span className="text-xs text-red-400">
//                         {passwordLengthMessage}
//                         {invalidPasswordMessage}
//                       </span>

//                       <div className="relative mt-4 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-1 focus:border-indigo-500 focus:ring-indigo-500">
//                         <label
//                           htmlFor="password"
//                           className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
//                         >
//                           Re-enter Password
//                         </label>
//                         <input
//                           type="password"
//                           name="passwordTest"
//                           id="passwordTest"
//                           className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
//                           placeholder=""
//                           onChange={(e) => {
//                             handlePasswordValidation(e.target.value);
//                           }}
//                         />
//                       </div>
//                       <span className="text-xs text-red-400">
//                         {passwordMatchMessage}
//                       </span>

//                       <div className="mt-2 flex items-center justify-between"></div>

//                       <div>
//                         <div
//                           className="mt-3 flex w-full justify-center rounded-full border bg-emerald-600 px-4 py-2 text-center text-sm tracking-wider text-white shadow-sm hover:bg-emerald-700 focus:outline-none"
//                           onClick={() => handlePasswordChange()}
//                         >
//                           Reset Password
//                         </div>
//                       </div>
//                     </div>
//                     {/* <div className="relative mt-7">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-300" />
//                       </div>
//                       <div className="relative flex justify-center text-sm">
//                         <span className="bg-white px-2 text-gray-500">
//                           We will send you a verification email
//                         </span>
//                       </div>
//                     </div> */}
//                   </div>
//                 </Transition.Child>
//               </div>
//             </Dialog>
//           ) : (
//             <Dialog
//               as="div"
//               className="fixed inset-0 z-10 overflow-y-auto"
//               onClose={keepOpen}
//             >
//               <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0"
//                   enterTo="opacity-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100"
//                   leaveTo="opacity-0"
//                 >
//                   <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 {/* This element is to trick the browser into centering the modal contents. */}
//                 <span
//                   className="hidden sm:inline-block sm:h-screen sm:align-middle"
//                   aria-hidden="true"
//                 >
//                   &#8203;
//                 </span>
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                   enterTo="opacity-100 translate-y-0 sm:scale-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                   leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 >
//                   <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
//                     <div>
//                       <div className="grid justify-items-end">
//                         <AiOutlineClose
//                           className="h-6 w-6 cursor-pointer text-gray-400"
//                           onClick={() => handleClose()}
//                         />
//                       </div>
//                       <div className="mt-3 text-center sm:mt-5">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-lg font-medium leading-6 text-gray-900"
//                         >
//                           <div className="grid justify-items-center  ">
//                             <FaRegThumbsUp className="text-5xl text-emerald-600 " />
//                             <span className="mt-5 text-sm text-gray-400">
//                               Password reset!
//                             </span>
//                           </div>
//                         </Dialog.Title>
//                       </div>
//                     </div>
//                   </div>
//                 </Transition.Child>
//               </div>
//             </Dialog>
//           )}
//         </Transition.Root>
//       </>

//       <>
//         <Transition.Root show={showWelcomeModal} as={Fragment}>
//           <Dialog
//             as="div"
//             className="fixed inset-0 z-10 overflow-y-auto"
//             onClose={keepOpen}
//           >
//             <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0"
//                 enterTo="opacity-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//               >
//                 <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//               </Transition.Child>

//               {/* This element is to trick the browser into centering the modal contents. */}
//               <span
//                 className="hidden sm:inline-block sm:h-screen sm:align-middle"
//                 aria-hidden="true"
//               >
//                 &#8203;
//               </span>
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               >
//                 <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
//                   <div>
//                     <div className="grid justify-items-end">
//                       <AiOutlineClose
//                         className="h-6 w-6 cursor-pointer text-gray-400"
//                         onClick={() => handleClose()}
//                       />
//                     </div>
//                     <div className="mt-3 text-center sm:mt-5">
//                       <Dialog.Title
//                         as="h3"
//                         className="text-lg font-medium leading-6 text-gray-900"
//                       >
//                         <div className="grid justify-items-center  ">
//                           <BsFillCheckCircleFill className="text-9xl text-emerald-600 " />
//                           <div className="mt-8 w-72 text-sm text-gray-400">
//                             Congratulations On Subscribing To Content Creator
//                             Templates!
//                           </div>
//                           <div className="mt-5 w-60 text-sm text-gray-400">
//                             You can now download any asset on the site for your
//                             projects.
//                           </div>
//                         </div>
//                       </Dialog.Title>
//                     </div>
//                   </div>
//                 </div>
//               </Transition.Child>
//             </div>
//           </Dialog>
//         </Transition.Root>
//       </>
//     </>
//   );
// };

// export default LoginModal;
