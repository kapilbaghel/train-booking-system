"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Clock3,
  TrainFront,
  ArrowRight,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";

export default function TrainsContent() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  console.log("FROM",from);
  console.log("TO",to);
  console.log("DATE",date);


  const [trains, setTrains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTrains = async () => {

      try {

        const formattedDate =
          date?.replaceAll("-", "");

        const res = await fetch(
          `/api/trains?from=${from}&to=${to}&date=${formattedDate}`
        );

        const data = await res.json();

        setTrains(data.body?.trains || []);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchTrains();

  }, []);

  // LOADING UI
  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center px-4">

        <div className="flex flex-col items-center gap-5">

          <div className="w-16 h-16 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />

          <h2 className="text-white text-xl sm:text-2xl font-semibold">
            Loading Trains...
          </h2>

        </div>

      </div>
    );
  }

  return (

    <div className="relative min-h-screen bg-black overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-orange-500/10 blur-[180px] rounded-full -z-10" />

      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto mb-6">

        <button
          onClick={() => router.back()}
          className="group flex items-center gap-3 bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 px-5 py-3 rounded-2xl transition-all duration-300"
        >

          <ArrowLeft className="w-5 h-5 text-orange-500 group-hover:text-black transition" />

          <span className="text-white group-hover:text-black font-medium transition">
            Back
          </span>

        </button>

      </div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          {/* ICON */}
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">

            <TrainFront className="text-orange-500 w-7 h-7" />

          </div>

          {/* TEXT */}
          <div>

            <p className="text-orange-500 text-xs sm:text-sm uppercase tracking-[0.3em]">
              Mangal Journey
            </p>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-1">
              Available <span className="text-orange-500">Trains</span>
            </h1>

          </div>

        </div>

        {/* SEARCH DETAILS */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-400 mt-8">

          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            From: <span className="text-white">{from}</span>
          </div>

          <ArrowRight className="text-orange-500 w-4 h-4" />

          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            To: <span className="text-white">{to}</span>
          </div>

          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">

            <CalendarDays className="w-4 h-4 text-orange-500" />

            <span className="text-white">
              {date}
            </span>

          </div>

        </div>

      </div>

      {/* TRAIN LIST */}
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {trains.map((train: any, index) => (

          <div
            key={index}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 md:p-8 hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
          >

            {/* CARD GLOW */}
            <div className="absolute top-0 right-0 w-40 sm:w-60 h-40 sm:h-60 bg-orange-500/10 blur-3xl rounded-full" />

            {/* TOP SECTION */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* TRAIN INFO */}
              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">

                  <TrainFront className="text-orange-500 w-5 h-5" />

                </div>

                <div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white truncate max-w-[220px] sm:max-w-full">
                    {train.trainName}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    Train No: {train.trainNumber}
                  </p>

                </div>

              </div>

              {/* DURATION */}
              <div className="w-fit flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 px-4 sm:px-5 py-3 rounded-2xl">

                <Clock3 className="text-orange-500 w-5 h-5" />

                <div>

                  <p className="text-xs text-gray-400">
                    Duration
                  </p>

                  <p className="text-white font-semibold text-sm sm:text-base">
                    {train.duration}
                  </p>

                </div>

              </div>

            </div>

            {/* ROUTE SECTION */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-10">

              {/* SOURCE */}
              <div className="text-center md:text-left w-full md:w-auto">

                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
                  {train.source}
                </p>

                <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-[220px] mx-auto md:mx-0">
                  {train.source_name}
                </p>

                <div className="mt-5">

                  <p className="text-sm text-gray-500">
                    Departure
                  </p>

                  <p className="text-lg sm:text-xl font-semibold text-orange-500 mt-1">

                    {new Date(train.departure).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}

                  </p>

                </div>

              </div>

              {/* DESKTOP ROUTE */}
              <div className="hidden md:flex flex-1 w-full max-w-xl">

                <div className="relative flex items-center w-full">

                  <div className="w-5 h-5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />

                  <div className="flex-1 border-t-2 border-dashed border-orange-500/50" />

                  <TrainFront className="text-orange-500 w-6 h-6 mx-4" />

                  <div className="flex-1 border-t-2 border-dashed border-orange-500/50" />

                  <div className="w-5 h-5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />

                  <div className="absolute left-1/2 -translate-x-1/2 -top-5 bg-black border border-orange-500/30 px-4 py-1 rounded-full text-xs text-orange-500 whitespace-nowrap">
                    {train.duration}
                  </div>

                </div>

              </div>

              {/* MOBILE ROUTE */}
              <div className="flex md:hidden items-center justify-center gap-3 w-full">

                <div className="w-3 h-3 rounded-full bg-orange-500" />

                <div className="flex-1 border-t border-dashed border-orange-500" />

                <TrainFront className="text-orange-500 w-5 h-5" />

                <div className="flex-1 border-t border-dashed border-orange-500" />

                <div className="w-3 h-3 rounded-full bg-orange-500" />

              </div>

              {/* DESTINATION */}
              <div className="text-center md:text-right w-full md:w-auto">

                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
                  {train.destination}
                </p>

                <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-[220px] mx-auto md:ml-auto">
                  {train.destination_name}
                </p>

                <div className="mt-5">

                  <p className="text-sm text-gray-500">
                    Arrival
                  </p>

                  <p className="text-lg sm:text-xl font-semibold text-orange-500 mt-1">

                    {new Date(train.arrival).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}

                  </p>

                </div>

              </div>

            </div>

            {/* CLASSES */}
            <div className="mt-10 flex flex-wrap gap-3">

              {train.classes.map((item: string, i: number) => (

                <div
                  key={i}
                  className="px-3 sm:px-5 py-2 rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium hover:bg-orange-500 hover:text-black transition-all duration-300 cursor-pointer"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}