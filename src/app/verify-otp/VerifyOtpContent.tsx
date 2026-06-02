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
      alert("OTP Verified");
      router.push(`/reset-password?email=${email}&otp=${otp}`);
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
      <h2>Verify OTP</h2>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <button style={{ marginTop: 20, width: "100%", padding: 10 }}>
          Verify OTP
        </button>
      </form>
    </div>
  );
}