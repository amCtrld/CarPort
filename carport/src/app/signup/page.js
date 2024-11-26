'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com";

// EmailJS Credentials from environment variables
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// Function to send email using EmailJS
const sendPasswordEmail = async (email, password) => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        user_email: email,
        user_password: password,
      },
      PUBLIC_KEY
    );
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
    alert("Could not send email. Please try again.");
  }
};

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    // Check if the email is already registered
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((user) => user.email === email)) {
      alert("Email is already registered!");
      return;
    }

    // Generate a random password
    const password = Math.random().toString(36).substring(2, 10);
    
    // Save user data to localStorage
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Send the generated password to the user's email using EmailJS
    await sendPasswordEmail(email, password);

    // Redirect to the login page
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover"
      style={{
        backgroundImage: "url('/images/logincarbg.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
