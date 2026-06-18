import { Suspense } from "react";
import SeatsAvailability from "./SeatsAvailability";

// Loading UI jab tak params load ho rahe hon
function SeatsLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5 relative z-10">
      <div className="w-14 h-14 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
      <div className="text-center">
        <h3 className="text-white font-semibold text-lg">Verifying Trip Details...</h3>
        <p className="text-gray-500 text-xs mt-1 animate-pulse">Reading URL parameters safely</p>
      </div>
    </div>
  );
}

// MAIN EXPORT JO NEXT.JS READ KAREGA
export default function Page() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-10">
      {/* GLOBAL BACKGROUND GLOW EFFECT */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-orange-500/10 blur-[150px] sm:blur-[200px] rounded-full -z-10 pointer-events-none" />

      {/* AAPKA SUSPENSE YAHA HOGA */}
      <Suspense fallback={<SeatsLoadingFallback />}>
        <SeatsAvailability />
      </Suspense>
    </div>
  );
}