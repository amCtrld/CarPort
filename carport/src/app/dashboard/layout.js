'use client';

import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1>CarPort Dashboard</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
