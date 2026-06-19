"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const [bookingData, setBookingData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("bookingData");

    if (saved) {
      setBookingData(JSON.parse(saved));
    }
  }, []);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto bg-zinc-900 border border-orange-500 rounded-3xl p-8">

        {/* Success Message */}
        <div className="text-center mb-8">
       <div className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
  <span className="text-white text-5xl font-bold">✓</span>
</div>

          <h1 className="text-4xl font-bold text-orange-500 mb-3">
            Congratulations!
          </h1>

          <p className="text-gray-300 text-lg">
            Your ticket has been confirmed successfully.
            Thank you for booking with us.
            We wish you a safe and pleasant journey.
          </p>
        </div>

        {/* Journey Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">
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
<div className="mb-6">
  <h2 className="text-2xl font-semibold text-orange-400 mb-4">
    Train Details
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    <div>
      <p className="text-gray-400">Train Name</p>
      <p>{bookingData.train.trainName}</p>
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

    <div>
      <p className="text-gray-400">Departure</p>
      <p>
        {new Date(bookingData.train.departure).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
    </div>

    <div>
      <p className="text-gray-400">Arrival</p>
      <p>
        {new Date(bookingData.train.arrival).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
    </div>

    <div>
      <p className="text-gray-400">Duration</p>
      <p>{bookingData.train.duration}</p>
    </div>

  </div>
</div>
        {/* Passenger Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">
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
                      <p className="text-gray-400">
                        Berth Preference
                      </p>
                      <p>
                        {passenger.berthPreference ||
                          "No Preference"}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">
            Contact Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
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

        {/* Fare & Booking */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">
            Booking Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Total Fare</p>
              <p>₹{bookingData.fare.totalFare}</p>
            </div>

            <div>
              <p className="text-gray-400">Booking Date</p>
              <p>
                {new Date(bookingData.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* OK Button */}
        <div className="flex justify-end mt-8">
          <button 
            onClick={() => {
              localStorage.removeItem("bookingData");
              router.push("/");
            }}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-10 py-3 rounded-xl"
          >
            OK
          </button>
        </div>

      </div>
    </div>
  );
}