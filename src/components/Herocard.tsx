"use client";

import Image from "next/image";

export default function InfoCard() {
  return (
    <section className="relative w-full overflow-hidden bg-black">

      {/* BACKGROUND GLOW SYSTEM (same as navbar theme) */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full -z-10" />

      {/* MAIN WRAPPER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-28">

        <div className="grid md:grid-cols-2 items-start gap-16 lg:gap-24">

          {/* LEFT - TEXT */}
          <div className="flex flex-col gap-6">

            <span className="text-orange-500 text-sm tracking-[0.3em] uppercase">
              Mangal Journey
            </span>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Fast, Smart &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Seamless Booking
              </span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
              Experience next-generation train booking with real-time availability,
              lightning-fast search, and a smooth modern interface designed for speed.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-300">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                🚆 Live Availability
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                ⚡ Instant Search
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                🔒 Secure Booking
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-4 mt-2">
              <button 
              onClick={()=>document.getElementById("popular-routes")?.scrollIntoView({behavior:"smooth", block:"start"})}
              className="px-7 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 active:scale-95 transition shadow-lg shadow-orange-500/20">
                Explore Trains →
              </button>

              <button className="px-6 py-3 rounded-full font-medium text-white border border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500/50 transition">
                Learn More
              </button>
            </div>

          </div>

          {/* RIGHT - IMAGE */}
          <div className="relative">

           <div className="relative w-full h-[460px] md:h-[560px] rounded-2xl overflow-hidden border border-white/10  shadow-[0_0_80px_rgba(249,115,22,0.25)]">
<Image
  src="/routes/train.png"
  alt="Train Booking"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover scale-105 hover:scale-110 transition duration-700 ease-in-out"
/>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />

              {/* BADGE */}
              <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md border border-white/10 text-orange-400 px-4 py-2 rounded-full text-xs font-semibold">
                ⚡ Live Train Search
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}