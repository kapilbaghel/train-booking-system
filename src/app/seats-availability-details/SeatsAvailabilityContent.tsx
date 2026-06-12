"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, RotateCw, ChevronRight, Info, Zap, ShieldCheck } from "lucide-react";

export default function SeatsAvailabilityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [train, setTrain] = useState<any>(null);
  const [classType, setClassType] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0); // 0 index matlab exact select ki hui pehli date
  const [availabilityDates, setAvailabilityDates] = useState<any[]>([]);
  const [quota, setQuota] = useState<"GN" | "TQ">("GN"); // GN = General, TQ = Tatkal

  // 1. URL se selected parameters lein safely
  const urlDate = searchParams.get("selectedDate") || "2026-06-20";
  const classCode = searchParams.get("classType") || "3A";

  useEffect(() => {
    // LocalStorage se data nikalte hain
    const savedTrain = localStorage.getItem("selectedTrainData");
    const savedClass = localStorage.getItem("selectedClassType");

    if (savedTrain) {
      const trainObj = JSON.parse(savedTrain);
      setTrain(trainObj);
      
      const currentClass = savedClass || classCode;
      setClassType(currentClass);

      // Current selected class ki specific details extract karein
      const currentAvl = trainObj.availability?.find((item: any) => item.code === currentClass);

      // Base fare calculate karein aur Tatkal ke liye premium charge add karein (approx ₹150-₹300)
      const baseFare = parseInt(currentAvl?.fare || "1135");
      const finalFare = quota === "TQ" ? baseFare + 250 : baseFare;

      // Aapki select ki hui exact date se dynamic 5 dino ka slot ready karein
      const baseDate = new Date(urlDate);
      const generatedSlots = Array.from({ length: 5 }).map((_, i) => {
        const nextDate = new Date(baseDate);
        nextDate.setDate(baseDate.getDate() + i);

        // Date Format like '20 Jun, Sat'
        const formattedDate = nextDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          weekday: "short",
        });

        // Sirf pehle tab (Index 0) par actual/tatkal seat dikhana jo user select karke aaya h
        if (i === 0) {
          return {
            date: formattedDate,
            // Agar Tatkal quota h toh status premium standard par simulate hoga
            status: quota === "TQ" 
              ? "AVAILABLE-0008" 
              : (currentAvl?.status_shortform || "AVAILABLE-0027"),
            price: `₹${finalFare}`,
            available: quota === "TQ" ? true : currentAvl?.available_flag === "true",
            timeUpdated: currentAvl?.time_of_availability || "Just now"
          };
        }

        // --- PRODUCTION SAFE LOGIC FOR SEQUENTIAL TABS ---
        const isCurrentlyAvailable = quota === "TQ" 
          ? i % 2 === 0 // Tatkal me alternating waitlist simulate karne ke liye
          : (currentAvl?.available_flag === "true" || (!currentAvl?.status_shortform?.includes("WL")));
        
        const sequentialSeatCount = 18 - (i * 2); 
        
        return {
          date: formattedDate,
          status: isCurrentlyAvailable 
            ? `AVAILABLE-00${sequentialSeatCount > 0 ? sequentialSeatCount : "02"}` 
            : quota === "TQ" ? `TQWL ${4 * i}` : `WL ${12 * i}`,
          price: `₹${finalFare}`,
          available: isCurrentlyAvailable,
          timeUpdated: "Checked now"
        };
      });

      setAvailabilityDates(generatedSlots);
    }
  }, [urlDate, classCode, quota]); // Quota change hone par useEffect phir se chalega

  if (!train || availabilityDates.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-400 text-sm font-medium">Loading availability matrix...</p>
        </div>
      </div>
    );
  }

  const currentSelection = availabilityDates[activeTab] || {};
  // Helper to safely identify if a status means waitlisted
  const isWl = currentSelection.status?.includes("WL") || currentSelection.status?.includes("REGRET");

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-10 lg:px-16 py-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* TOP HEADER OVERVIEW */}
        <div className="flex items-center gap-4 mb-4 bg-zinc-900/40 p-3.5 rounded-2xl border border-zinc-800/60">
          <button onClick={() => router.back()} className="p-1.5 hover:bg-zinc-800 rounded-xl transition cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-zinc-100">{train.trainName}</h2>
              <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-mono">#{train.trainNumber}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {train.source} → {train.destination} | Selected Class: <span className="text-orange-500 font-bold">{classType}</span>
            </p>
          </div>
        </div>

        {/* --- DYNAMIC QUOTA SELECTOR TABS (GENERAL / TATKAL) --- */}
        <div className="flex bg-zinc-900/40 p-1 rounded-xl border border-zinc-800/80 mb-4 gap-1">
          <button 
            onClick={() => { setQuota("GN"); setActiveTab(0); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              quota === "GN" 
                ? "bg-zinc-800 text-white shadow-md border border-zinc-700/50" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-green-500" />
            General Quota
          </button>
          
          <button 
            onClick={() => { setQuota("TQ"); setActiveTab(0); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              quota === "TQ" 
                ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-orange-400 shadow-md border border-orange-500/30" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            Tatkal Quota
          </button>
        </div>

        {/* --- MAIN AVAILABILITY SLIDER CARD --- */}
        <div className="bg-[#111111] border border-zinc-800/90 rounded-2xl overflow-hidden shadow-2xl mb-6">
          
          {/* HORIZONTAL DATE SLIDER STRIP */}
          <div className="flex overflow-x-auto border-b border-zinc-800/80 scrollbar-none">
            {availabilityDates.map((item: any, index: number) => {
              const isActive = activeTab === index;
              const itemWl = item.status?.includes("WL") || item.status?.includes("REGRET");
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 min-w-[110px] text-center p-3.5 transition-all relative cursor-pointer ${
                    isActive ? "bg-zinc-900/90" : "hover:bg-zinc-900/30"
                  }`}
                >
                  <p className={`text-xs font-semibold ${isActive ? "text-orange-500" : "text-zinc-400"}`}>
                    {item.date}
                  </p>
                  
                  <p 
                    className="text-xs font-black mt-1.5 tracking-tight"
                    style={{ color: itemWl ? "#FF8C01" : "#00A657" }}
                  >
                    {item.status}
                  </p>
                  
                  <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">
                    {item.price}
                  </p>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* DYNAMIC GLOW ALERT ZONE BANNER */}
          <div 
            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300"
            style={{ 
              backgroundColor: !isWl ? "rgba(0, 166, 87, 0.08)" : "rgba(255, 140, 1, 0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.03)"
            }}
          >
            <div className="flex items-center gap-2.5">
              <div 
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: !isWl ? "#00A657" : "#FF8C01" }}
              />
              <div>
                <p className="text-xs font-medium text-zinc-400">
                  {quota === "TQ" ? "Tatkal" : "General"} Seats for <span className="text-zinc-200 font-bold">{currentSelection.date}</span>
                </p>
                <h3 
                  className="text-lg font-black tracking-wide mt-0.5 transition-all duration-300"
                  style={{ color: !isWl ? "#00A657" : "#FF8C01" }}
                >
                  {currentSelection.status}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-500 bg-zinc-950/80 px-2.5 py-1.5 rounded-lg border border-zinc-900 text-[11px] w-fit">
              <RotateCw className="w-3 h-3 text-zinc-500" />
              <span>Checked {currentSelection.timeUpdated || "Just now"}</span>
            </div>
          </div>

          {/* TOTAL FARE SUMMARY SECTION */}
          <div className="p-4 bg-zinc-900/20 flex items-center justify-between border-t border-zinc-900">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <Info className="w-3.5 h-3.5 text-zinc-500" />
              <span>
                {quota === "TQ" 
                  ? "Tatkal booking charges included in total fare" 
                  : "Free Cancellation option available on checkout"}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider">Total Fare</span>
              <span className="text-xl font-black text-zinc-100 tracking-tight">
                {currentSelection.price}
              </span>
            </div>
          </div>

        </div>

        {/* BOTTOM REDIRECT TRIGGER BUTTON */}
        <button 
          onClick={() => {
            router.push(`/seats-availability-details/passenger-form?trainNumber=${train.trainNumber}&classType=${classType}&date=${urlDate}&quota=${quota}`);
          }}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-black py-4 px-4 rounded-xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-xl cursor-pointer"
        >
          <span>Proceed to Book ({currentSelection.price})</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>

      </div>
    </div>
  );
}