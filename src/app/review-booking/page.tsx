"use client"
import {useEffect,useState} from "react"
import { useRouter } from "next/navigation";

export default function ReviewPage(){
    const[bookingData,setBookingData]=useState<any>(null);
    const[loading,setLoading]=useState(false)
    const router = useRouter();

    useEffect(() => {
  const saved = localStorage.getItem("bookingData");

  console.log("Saved Data:", saved);

  if (saved) {
    setBookingData(JSON.parse(saved));
  }
}, []);

    if (!bookingData) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }
console.log("bookind data",bookingData);

const handlePayment = () => {
  setLoading(true);

  setTimeout(() => {
    router.push("/fare-summary");
  }, 1000);
};

    return (
  <div className="min-h-screen bg-black text-white p-4">
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Review Booking
      </h1>

      {/* Journey Details */}
      <div className="bg-zinc-900 border border-orange-500 rounded-2xl p-5 mb-6">

        <h2 className="text-xl font-semibold text-orange-400 mb-4">
          Journey Details
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div>
            <p className="text-gray-400">Train No.</p>
            <p>{bookingData.journey.trainNumber}</p>
          </div>

          <div>
            <p className="text-gray-400">Class</p>
            <p>{bookingData.journey.classType}</p>
          </div>

          <div>
            <p className="text-gray-400">Date</p>
            <p>{bookingData.journey.date}</p>
          </div>

          <div>
            <p className="text-gray-400">Quota</p>
            <p>{bookingData.journey.quota}</p>
          </div>

        </div>

      </div>

     

            {/* Train Details */}
      <div className="bg-zinc-900 border border-orange-500 rounded-2xl p-5 mb-6">

  <h2 className="text-xl font-semibold text-orange-400 mb-4">
    Selected Train
  </h2>

  {/* Train Name, Number, Route */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

    <div>
      <p className="text-gray-400">Train Name</p>
      <p className="font-semibold">
        {bookingData.train.trainName}
      </p>
    </div>

    <div>
      <p className="text-gray-400">Train Number</p>
      <p>{bookingData.train.trainNumber}</p>
    </div>

    <div>
      <p className="text-gray-400">Route</p>
      <p>
        {bookingData.train.source} → {bookingData.train.destination}
      </p>
    </div>

  </div>

  {/* Departure, Arrival, Duration */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <div>
      <p className="text-gray-400">Departure</p>
      <p>{new Date(bookingData.train.departure).toLocaleString(
        "en-IN",{
            day:"2-digit",
            month:"short",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:true,
        }
      )}</p>
    </div>

    <div>
      <p className="text-gray-400">Arrival</p>
      <p>{new Date(bookingData.train.arrival).toLocaleString(
        "en-IN",{
            day:"2-digit",
            month:"short",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:true,
        }
      )}</p>
    </div>

    <div>
      <p className="text-gray-400">Duration</p>
      <p>{bookingData.train.duration}</p>
    </div>

  </div>

  {/* Passenger Details */}
<div className="bg-zinc-900  rounded-2xl p-5 mb-6">

  <h2 className="text-xl font-semibold text-orange-400 mb-4">
    Passenger Details
  </h2>

  <div className="space-y-4">

    {bookingData.passengers.map(
      (passenger: any, index: number) => (
        <div
          key={index}
          className="border border-gray-700 rounded-xl p-4"
        >

          <h3 className="font-semibold text-orange-300 mb-3">
            Passenger {index + 1}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div>
              <p className="text-gray-400">Name</p>
              <p>{passenger.name}</p>
            </div>

            <div>
              <p className="text-gray-400">Age</p>
              <p>{passenger.age}</p>
            </div>

            <div>
              <p className="text-gray-400">Gender</p>
              <p>{passenger.gender}</p>
            </div>

            <div>
              <p className="text-gray-400">Berth Preference</p>
              <p>
                {passenger.berthPreference || "No Preference"}
              </p>
            </div>

          </div>

        </div>
      )
    )}

  </div>

</div>

{/* Contact Details */}
<div className="bg-zinc-900 rounded-2xl ">

  <h2 className="text-xl font-semibold text-orange-400 mb-4">
    Contact Details
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div>
      <p className="text-gray-400">Mobile Number</p>
      <p>{bookingData.contact.mobile}</p>
    </div>

    <div>
      <p className="text-gray-400">Email</p>
      <p>{bookingData.contact.email}</p>
    </div>

  </div>

</div>

<div className="flex justify-between mt-8">

  {/* Back Button (Left Side) */}
  <button
    onClick={() => router.back()}
    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold"
  >
    ← Back
  </button>

  {/* Payment Button (Right Side) */}
  <button
    onClick={handlePayment}
    disabled={loading}
    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
      loading
        ? "bg-orange-400 cursor-not-allowed text-white"
        : "bg-orange-500 hover:bg-orange-600 text-black"
    }`}
  >
    {loading ? (
      <>
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        Processing...
      </>
    ) : (
      "View Fare"
    )}
  </button>

</div>

</div>

    </div>
  </div>

  
);

}