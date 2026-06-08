"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login Failed");
        return;
      }

      setMessage("Login Successful ✅");

      router.replace("/");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black px-4">
      <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur-md border border-orange-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(249,115,22,0.15)]">

        <h1 className="text-3xl font-bold text-center text-orange-500 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Login to continue your journey 🚆
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 placeholder:text-gray-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 placeholder:text-gray-500"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() =>
                router.push("/forgot-password")
              }
              className="text-orange-500 hover:text-orange-400 transition"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-black font-semibold py-3 rounded-lg hover:bg-orange-400 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p
              className={`text-center text-sm mt-3 ${
                message.includes("Successful")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <div className="mt-6 text-center text-gray-400">
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-orange-500 hover:text-orange-400 font-medium transition"
            >
              Sign Up
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}