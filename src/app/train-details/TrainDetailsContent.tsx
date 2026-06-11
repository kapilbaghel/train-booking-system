// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowLeft } from "lucide-react";

// export default function TrainDetailsContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const trainNumber = searchParams.get("trainNumber");
//   const trainName = searchParams.get("trainName");
//   const source = searchParams.get("source");
//   const sourceName = searchParams.get("sourceName");
//   const destination = searchParams.get("destination");
//   const destinationName = searchParams.get("destinationName");

//   const departure = searchParams.get("departure");
//   const arrival = searchParams.get("arrival");
//   const seatClass = searchParams.get("class");

//   const departureDate = departure ? new Date(departure.replace(" 00:00", "Z")) : null;
//   const arrivalDate = arrival ? new Date(arrival.replace(" 00:00", "Z")) : null;

//   const formattedDeparture = departureDate
//     ? departureDate.toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "long",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       })
//     : "";

//   const formattedArrival = arrivalDate
//     ? arrivalDate.toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "long",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       })
//     : "";

//   return (
//     // Is layout mein humne flex-col kiya hai, jisse cheezein ek ke neeche ek aayengi bina kisi absolute alignment ke issue ke
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 gap-6">
      
//       {/* Wrapper to align button to the left of the card's width */}
//       <div className="w-full max-w-3xl flex justify-start">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-black rounded-xl font-semibold hover:bg-orange-600 transition"
//         >
//           <ArrowLeft size={18} />
//           Back
//         </button>
//       </div>

//       {/* Train Details Card */}
//       <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl p-8 shadow-xl border border-orange-500/20">
//         <h1 className="text-3xl font-bold mb-6">Train Details</h1>

//         <div className="space-y-3">
//           <p><strong>Train No:</strong> {trainNumber}</p>
//           <p><strong>Train Name:</strong> {trainName}</p>
//           <p><strong>From:</strong> {source} ({sourceName})</p>
//           <p><strong>To:</strong> {destination} ({destinationName})</p>
//           <p><strong>Departure:</strong> {formattedDeparture}</p>
//           <p><strong>Arrival:</strong> {formattedArrival}</p>

//           <p className="text-orange-500 font-bold">
//             Selected Class: {seatClass}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }