
"use client";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const sendOtp = async (email: string) => {
  await fetch("/api/authf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const actionCodeSettings = {
    url: "http://localhost:3000/finishSignIn", // Your app redirect
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem("emailForSignIn", email);
};
