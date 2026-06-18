"use client";

import { useEffect, useState } from "react";

export default function FareSummary() {
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bookingData");

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

  const farePerPassenger = 450;

  const passengerCount = bookingData.passengers.length;

  const baseFare = farePerPassenger * passengerCount;

  const reservationCharge = 60;

  const superfastCharge = 45;

  const gst = 25;

  const totalFare =
    baseFare +
    reservationCharge +
    superfastCharge +
    gst;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          Fare Summary
        </h1>

        {/* Passenger Fare */}
        <div className="bg-zinc-900 border border-orange-500 rounded-2xl p-5 mb-6">

          <h2 className="text-xl font-semibold text-orange-400 mb-4">
            Passenger Fare
          </h2>

          <div className="space-y-4">
            {bookingData.passengers.map(
              (passenger: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-700 pb-3"
                >
                  <span>
                    {index + 1}. {passenger.name}
                  </span>

                  <span>₹{farePerPassenger}</span>
                </div>
              )
            )}
          </div>

        </div>

        {/* Fare Breakdown */}
        <div className="bg-zinc-900 border border-orange-500 rounded-2xl p-5 mb-6">

          <h2 className="text-xl font-semibold text-orange-400 mb-4">
            Fare Breakdown
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Base Fare</span>
              <span>₹{baseFare}</span>
            </div>

            <div className="flex justify-between">
              <span>Reservation Charge</span>
              <span>₹{reservationCharge}</span>
            </div>

            <div className="flex justify-between">
              <span>Superfast Charge</span>
              <span>₹{superfastCharge}</span>
            </div>

            <div className="flex justify-between">
              <span>GST</span>
              <span>₹{gst}</span>
            </div>

            <hr className="border-gray-700" />

            <div className="flex justify-between text-xl font-bold text-orange-400">
              <span>Total Fare</span>
              <span>₹{totalFare}</span>
            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-between">

          <button
            onClick={() => window.history.back()}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold"
          >
            ← Back
          </button>

          <button
            className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-3 rounded-xl font-semibold"
          >
            Proceed to Payment
          </button>

        </div>

      </div>
    </div>
  );
}