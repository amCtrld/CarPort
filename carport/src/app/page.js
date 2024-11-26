'use client';

import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import AuthButtons from "../../components/AuthButtons";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-fixed"
      style={{
        backgroundImage: "url('/images/logincarbg.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center">
        <Header className="m-12"/>
        <AuthButtons
          onSignUp={() => router.push("/signup")}
          onLogin={() => router.push("/dashboard")}
        />
      </div>
    </div>
  );
}
