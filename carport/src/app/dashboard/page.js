'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLogin() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (role === "admin") {
      if (password === "Admin001") {
        router.push("/dashboard/admin");
      } else {
        alert("Invalid Admin Password!");
      }
    } else if (role === "customer") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email);

      if (user && user.password === password) {
        router.push("/dashboard/customer");
      } else {
        alert("Invalid Email or Password!");
      }
    } else {
      alert("Please select a role.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-fixed"
      style={{
        backgroundImage: "url('/images/logincarbg.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="flex gap-4 mb-4 justify-center">
          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-lg w-32 ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Admin
          </button>
          <button
            onClick={() => setRole("customer")}
            className={`px-4 py-2 rounded-lg w-32 ${role === "customer" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Customer
          </button>
        </div>
        {role === "customer" && (
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded-lg"
          />
        )}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
