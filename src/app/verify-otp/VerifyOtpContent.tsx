"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtpContent() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("OTP Verified ✅");
      router.push(`/reset-password?email=${email}&otp=${otp}`);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black px-4">
      <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur-md border border-orange-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(249,115,22,0.15)]">

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📩</div>

          <h2 className="text-3xl font-bold text-orange-500">
            Verify OTP
          </h2>

          <p className="text-gray-400 mt-2">
            Enter the OTP sent to your email
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              OTP Code
            </label>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-black font-semibold py-3 rounded-lg hover:bg-orange-400 transition-all duration-300"
          >
            Verify OTP
          </button>

        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/forgot-password")}
            className="text-orange-500 hover:text-orange-400 transition"
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
}