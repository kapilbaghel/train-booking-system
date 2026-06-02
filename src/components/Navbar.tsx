"use client";

import Link from "next/link";
import { Train, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = ["Home", "Trains", "Bookings", "Support"];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10">

      {/* TOP BAR */}
      <div className="w-full flex items-center justify-between px-6 md:px-10 lg:px-16 py-4">

        {/* LEFT LOGO */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
            <Train className="text-orange-500 w-5 h-5" />
          </div>

          <div className="flex flex-col leading-tight">
            <h1 className="text-white text-xl font-bold">
              Mangal <span className="text-orange-500">Journey</span>
            </h1>
            <span className="text-xs text-gray-400">
              Fast • Smart • Reliable Booking
            </span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item}
              href="/"
              className="text-gray-300 hover:text-orange-500 transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-orange-500 after:transition-all"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* SEARCH (desktop only) */}
          <div className="hidden md:flex items-center bg-white/5 px-4 py-2.5 rounded-full border border-white/10 focus-within:border-orange-500/50 transition">
            <Search className="w-4 h-4 text-orange-500" />
            <input
              placeholder="Search trains..."
              className="bg-transparent outline-none text-sm text-white ml-2 w-56 placeholder-gray-500"
            />
          </div>

          {/* SIGN UP (desktop only) */}
          <Link
            href="/signup"
            className="hidden md:flex bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition"
          >
            Sign Up
          </Link>

          {/* BOOK NOW (desktop only) */}
          <button className="hidden md:flex bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition">
            Book Now
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 rounded-lg border border-white/10"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-5 border-t border-white/10 bg-black/90">

          {/* NAV LINKS */}
          <div className="flex flex-col gap-4 mt-4">
            {navItems.map((item) => (
              <Link
                key={item}
                href="/"
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-orange-500"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* SEARCH MOBILE */}
          <div className="mt-5 flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Search className="w-4 h-4 text-orange-500" />
            <input
              placeholder="Search trains..."
              className="bg-transparent outline-none text-sm text-white ml-2 w-full"
            />
          </div>

          {/* BUTTONS MOBILE */}
          <div className="flex flex-col gap-3 mt-5">

            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="bg-orange-500 text-black font-semibold px-4 py-2 rounded-full text-center"
            >
              Sign Up
            </Link>

            <button className="bg-orange-600 text-black font-semibold px-4 py-2 rounded-full">
              Book Now
            </button>

          </div>
        </div>
      )}
    </header>
  );
}