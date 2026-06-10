"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition"
    >
      Logout
    </button>
  );
}