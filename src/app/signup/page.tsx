"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup Failed");
        return;
      }

      alert("Signup Successful ✅");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      router.replace("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-orange-500/20 p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center mb-2 text-orange-500">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Join us and start your journey today 🚆
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 text-white border border-zinc-700 p-3 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 placeholder:text-gray-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 text-white border border-zinc-700 p-3 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 placeholder:text-gray-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 text-white border border-zinc-700 p-3 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 placeholder:text-gray-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-black font-semibold p-3 rounded-lg hover:bg-orange-400 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-orange-500 hover:text-orange-400 font-medium transition"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}