"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, TrainFront, Armchair, CheckCircle2 } from "lucide-react";

export default function SeatsAvailability() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL parameters se data nikalna
  const trainNumber = searchParams.get("trainNumber");
  const classType = searchParams.get("classType");
  const selectedDate = searchParams.get("selectedDate");

  const [trainData, setTrainData] = useState<any>(null);
  const [selectedQuota, setSelectedQuota] = useState("GN");

 useEffect(() => {
  const savedData = localStorage.getItem("selectedTrainData");

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      console.log("Train Data:", parsedData); // 👈 YEH LINE ADD KARNI HAI

      setTrainData(parsedData);
    } catch (err) {
      console.error("Error parsing train data:", err);
    }
  }
}, []);

  const gnAvailability = trainData?.availability?.find(
  (item: any) =>
    item.code === classType &&
    item.quota === "GN"
);

const tqAvailability = trainData?.availability?.find(
  (item: any) =>
    item.code === classType &&
    item.quota === "TQ"
);

  return (
    <div className="max-w-4xl mx-auto relative z-10">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-3 bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 px-5 py-3 rounded-2xl transition-all duration-300 mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 text-orange-500 group-hover:text-black transition" />
        <span className="text-white group-hover:text-black font-medium transition">
          Back to Trains
        </span>
      </button>

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
          <Armchair className="text-orange-500 w-7 h-7" />
        </div>
        <div>
          <p className="text-orange-500 text-xs sm:text-sm uppercase tracking-[0.3em]">
            Booking Dashboard
          </p>
          {/* <h1 className="text-2xl sm:text-4xl font-bold text-white mt-1">
            Seat <span className="text-orange-500">Availability</span>
          </h1> */}
        </div>
      </div>

      {/* SEAT DETAILS CARD */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 hover:border-orange-500/20 transition-all duration-300">
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* LEFT SIDE: TRAIN INFORMATION */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <TrainFront className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                {trainData?.trainName || "Loading Train Name..."}
              </h2>
            </div>

            <div className="space-y-2 border-l-2 border-orange-500/30 pl-4 ml-2">
              <p className="text-gray-400 text-sm">
                Train No: <span className="text-white font-semibold">{trainNumber || "N/A"}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Route: <span className="text-white font-medium">{trainData?.source || "N/A"} → {trainData?.destination || "N/A"}</span>
              </p>
              {trainData?.duration && (
                <p className="text-gray-400 text-sm">
                  Duration: <span className="text-white font-medium">{trainData.duration}</span>
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: SELECTED CLASS & DATE */}
          <div className="flex flex-col gap-4 md:items-end md:justify-center">
            <div className="flex flex-col md:items-end">
              <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Selected Class</span>
              <div className="bg-orange-500 text-black font-extrabold px-6 py-2 rounded-xl text-base shadow-lg shadow-orange-500/20">
                {classType || "N/A"}
              </div>
            </div>

            <div className="flex flex-col md:items-end mt-2">
              <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Journey Date</span>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                <CalendarDays className="w-4 h-4 text-orange-500" />
                <span className="text-white font-medium text-sm">{selectedDate || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

      {/* AVAILABILITY SECTION */}
<div className="mt-8 pt-8 border-t border-white/10">
  <h2 className="text-2xl font-bold text-white mb-6">
    Seat Availability
  </h2>

  {/* Quota Buttons */}
  <div className="flex gap-3 mb-6">
    <button
      onClick={() => setSelectedQuota("GN")}
      className={`px-5 py-2 rounded-xl font-semibold transition ${
        selectedQuota === "GN"
          ? "bg-orange-500 text-black"
          : "bg-white/5 border border-white/10 text-white"
      }`}
    >
      General (GN)
    </button>

    {tqAvailability && (
      <button
        onClick={() => setSelectedQuota("TQ")}
        className={`px-5 py-2 rounded-xl font-semibold transition ${
          selectedQuota === "TQ"
            ? "bg-orange-500 text-black"
            : "bg-white/5 border border-white/10 text-white"
        }`}
      >
        Tatkal (TQ)
      </button>
    )}
  </div>

  {selectedQuota === "GN" && gnAvailability && (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-400">Quota</span>
        <span className="text-white font-semibold">
          {gnAvailability.quota}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">Status</span>
        <span className="text-emerald-400 font-bold">
          {gnAvailability.status_shortform}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">Fare</span>
        <span className="text-white font-semibold">
          ₹{gnAvailability.fare}
        </span>
      </div>

      {gnAvailability.pnr_prediction && (
        <div className="flex justify-between">
          <span className="text-gray-400">
            Confirmation Chances
          </span>

          <span className="text-orange-500 font-bold">
            {gnAvailability.pnr_prediction.value}%
          </span>
        </div>
      )}

      {trainData?.meal_available && (
  <div className="flex justify-between">
    <span className="text-gray-400">
      Meal
    </span>

    <span className="text-green-400 font-bold">
      🍱 Yes
    </span>
  </div>

)}
    </div>
  )}



  {selectedQuota === "TQ" && tqAvailability && (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-400">Quota</span>
        <span className="text-white font-semibold">
          {tqAvailability.quota}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">Status</span>
        <span className="text-emerald-400 font-bold">
          {tqAvailability.status_shortform}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">Fare</span>
        <span className="text-white font-semibold">
          ₹{tqAvailability.fare}
        </span>
      </div>

      {tqAvailability.pnr_prediction && (
        <div className="flex justify-between">
          <span className="text-gray-400">
            Confirmation Chances
          </span>

          <span className="text-orange-500 font-bold">
            {tqAvailability.pnr_prediction.value}%
          </span>
        </div>
      )}

    {trainData?.meal_available && (
  <div className="flex justify-between">
    <span className="text-gray-400">
      Meal
    </span>

    <span className="text-green-400 font-bold">
      🍱 Yes
    </span>
  </div>
  
)}
    </div>
  )}

  {!gnAvailability && !tqAvailability && (
    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400">
      Seat availability data not available.
    </div>
  )}
</div>

{/* BOOK NOW BUTTON */}
<div className="mt-8 flex justify-end">
  <button
  onClick={() => {
  const selectedFare =
    selectedQuota === "GN"
      ? gnAvailability?.fare
      : tqAvailability?.fare;

  localStorage.setItem(
    "selectedFare",
    JSON.stringify(selectedFare)
  );

  router.push(
    `/passenger-details?trainNumber=${trainNumber}&classType=${classType}&date=${selectedDate}&quota=${selectedQuota}`
  );
}}
  className="px-8 py-3 rounded-2xl bg-orange-500 text-black font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
>
  <CheckCircle2 className="w-5 h-5" />
  Book Now
</button>
</div>
      </div>
    </div>
  );
}


// "use client"

// import { useState } from "react";

// export default function SeatsAvailability(){
//   const[quota,setQuota]=useState("GN")

//   const seatsData = {
//     general: [
//       { coach: "S1", available: 23 },
//       { coach: "S2", available: 10 },
//       { coach: "S3", available: 0 },
//     ],
//     tatkal: [
//       { coach: "S1", available: 5 },
//       { coach: "S2", available: 2 },
//       { coach: "S3", available: 1 },
//     ],
//   };

//   const selectedSeats = quota === "GN"? seatsData.general : seatsData.tatkal;


//   return(
//     <div className="min-h-screen bg-white border rounded-2xl ">
//       <h1 className="mt-10 ml-10 text-lg font-bold">Seats Availability</h1>
//       <div className="max-w-250 h-60 bg-red-200 m-auto flex gap-1 pt-3 pl-3">

//       <div >
//         <button   onClick={()=>setQuota("GN")} className={`bg-gray-300 w-30 h-8 px-3 py-1 rounded-xl ${quota === "GN"?"bg-green-500 text-white":"bg-gray-300 text-black"}`}
//         >Gn Quota</button>
//       </div>
// {quota==="GN" &&(
//   <div className="mt-4 w-50">{selectedSeats.map((seat,index)=>(
//     <div key={index} className="border p-2 rounded-lg mb-2 flex justify-between">
//       <span>{seat.coach} :</span>
//       <span>
//         {seat.available > 0 ? `Available: ${seat.available}` : "WL"}</span>
//     </div>
//   ))}</div>
// )}


//       <div>
//         <button onClick={()=>setQuota("TQ")} className={`bg-gray-300 w-30 h-8 px-3 py-1 rounded-xl ${quota === "TQ"?"bg-green-500 text-white":"bg-gray-300 text-black"}`}>Tq Quota</button>
// {quota==="TQ" &&(
//   <div className="mt-3 w-60">{selectedSeats.map((seat,index)=>(
//     <div key={index} className="border p-3 rounded-lg mb-2 flex justify-between">
//       <span>{seat.coach} :</span>
//       <span>
//         {seat.available > 0 ? `Available: ${seat.available}` : "WL"}</span>
//     </div>
//   ))}</div>
// )}
//         </div>
//       </div>
//     </div>
//   )
// }