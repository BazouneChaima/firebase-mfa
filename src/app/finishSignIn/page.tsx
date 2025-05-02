"use client";
import { useEffect } from "react";
import { signInWithEmailLink } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export default function FinishSignIn() {
  useEffect(() => {
    console.log("FinishSignIn component mounted");
    const email = window.localStorage.getItem("emailForSignIn");
    console.log("Email from local storage:", email);
    if (email && window.location.href) {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log("Logged in:", result.user);
          window.localStorage.removeItem("emailForSignIn");
          // Redirect to the desired page after successful sign-in
          window.location.href = "/"; // Change this to your desired redirect URL
        })
        .catch(console.error);
    }
  }, []);

  return <p>Finishing sign-in...</p>;
}
