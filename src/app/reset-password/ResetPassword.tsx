"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Password reset successful ✅");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black px-4">
      <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur-md border border-orange-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(249,115,22,0.15)]">

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔒</div>

          <h2 className="text-3xl font-bold text-orange-500">
            Reset Password
          </h2>

          <p className="text-gray-400 mt-2">
            Create a new secure password
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-black font-semibold py-3 rounded-lg hover:bg-orange-400 transition-all duration-300"
          >
            Reset Password
          </button>

        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-orange-500 hover:text-orange-400 transition"
          >
            ← Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}