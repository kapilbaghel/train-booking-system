"use client";

import { ArrowLeftRight, CalendarDays, Train } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Station = {
  data: {
    code: string;
    display_name: string;
  };
};

export default function StationSearch() {
  const router = useRouter();

  const [fromCity, setFromCity] = useState("");
  const [fromCode, setFromCode] = useState("");

  const [toCity, setToCity] = useState("");
  const [toCode, setToCode] = useState("");

  const [stations, setStations] = useState<Station[]>([]);
  const [toStations, setToStations] = useState<Station[]>([]);

  const [date, setDate] = useState("");
  const [isCustomDate, setIsCustomDate] = useState(false);

  // TEXT TRUNCATE FUNCTION
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.slice(0, maxLength) + "..."
      : text;
  };

  const today = new Date();

  const nextFiveDates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);

    return {
      fullDate: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("en-IN", { weekday: "short" }),
      number: d.getDate(),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
    };
  });

  const searchTrains = () => {
    if (!fromCode || !toCode || !date) {
      alert("Select stations and date");
      return;
    }

    router.push(`/trains?from=${fromCode}&to=${toCode}&date=${date}`);
  };

  const fetchStations = async (value: string) => {
    console.log("typing", value);
    setFromCity(value);

    if (!value) {
      setStations([]);
      return;
    }

    const res = await fetch(`/api/station?query=${value}`);
    const data = await res.json();
    console.log("data" , data);

    setStations(data);
  };

  const fetchToStations = async (value: string) => {
    setToCity(value);

    if (!value) {
      setToStations([]);
      return;
    }

    const res = await fetch(`/api/station?query=${value}`);
    const data = await res.json();

    setToStations(data);
  };

  const swapStations = () => {
    const tempCity = fromCity;
    const tempCode = fromCode;

    setFromCity(toCity);
    setFromCode(toCode);

    setToCity(tempCity);
    setToCode(tempCode);
  };

  return (
    <div className="relative w-full px-4 md:px-10 py-10 flex justify-center bg-black">

      {/* GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full -z-10 top-10 left-1/2 -translate-x-1/2" />

      {/* MAIN PANEL */}
      <div className="w-full max-w-6xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-orange-500/10 p-6 md:p-10">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
            <Train className="text-orange-500 w-5 h-5" />
          </div>

          <h2 className="text-white text-lg md:text-xl font-semibold">
            Search Your <span className="text-orange-600">Journey</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">

          {/* FROM */}
          <div className="relative">
            <p className="text-xs text-gray-400 mb-2">
              From
            </p>

            <input
              value={truncateText(fromCity, 22)}
              title={fromCity}
              onChange={(e) => fetchStations(e.target.value)}
              placeholder="Enter station"
              className="w-full truncate bg-white/5 border border-white/10 focus:border-orange-500/50 outline-none text-white px-4 py-3 rounded-xl"
            />

            {stations.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-black/90 border border-white/10 rounded-xl overflow-hidden max-h-72 overflow-y-auto">

                {stations.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setFromCity(s.data.display_name);
                      setFromCode(s.data.code);
                      setStations([]);
                    }}
                    className="p-3 text-sm text-white hover:bg-orange-500/20 cursor-pointer transition"
                  >
                    {s.data.display_name}
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* SWAP */}
          <div className="flex justify-center">
            <button
              onClick={swapStations}
              className="p-3 rounded-full border border-orange-500/30 text-orange-500 hover:bg-orange-500/10 transition mt-6"
            >
              <ArrowLeftRight />
            </button>
          </div>

          {/* TO */}
          <div className="relative">
            <p className="text-xs text-gray-400 mb-2">
              To
            </p>

            <input
              value={truncateText(toCity, 22)}
              title={toCity}
              onChange={(e) => fetchToStations(e.target.value)}
              placeholder="Enter station"
              className="w-full truncate bg-white/5 border border-white/10 focus:border-orange-500/50 outline-none text-white px-4 py-3 rounded-xl"
            />

            {toStations.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-black/90 border border-white/10 rounded-xl overflow-hidden max-h-72 overflow-y-auto">

                {toStations.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setToCity(s.data.display_name);
                      setToCode(s.data.code);
                      setToStations([]);
                    }}
                    className="p-3 text-sm text-white hover:bg-orange-500/20 cursor-pointer transition"
                  >
                    {s.data.display_name}
                  </div>
                ))}

              </div>
            )}
          </div>

          
          {/* SEARCH BUTTON */}
          <div className="flex items-end">
            <button
              onClick={searchTrains}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold py-3 rounded-xl hover:scale-105 active:scale-95 transition shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 mt-6"
            >
              <Train className="w-5 h-5" />
              Search
            </button>
          </div>

          {/* DATE */}
          {/* DATE */}
<div className="col-span-1 md:col-span-4 mt-4">
  <div className="flex flex-wrap md:flex-nowrap items-center gap-4">

    {!isCustomDate &&
      nextFiveDates.map((item) => (
        <div
          key={item.fullDate}
          onClick={() => {
            setDate(item.fullDate);
            setIsCustomDate(false);
          }}
          className={`min-w-[90px] px-6 py-3 rounded-lg text-xs text-center cursor-pointer border transition ${
            date === item.fullDate
              ? "bg-orange-600 text-black border-orange-500"
              : "bg-white/5 text-gray-300 border-white/10 hover:border-orange-500/50"
          }`}
        >
          <div>{item.day}</div>
          <div className="font-bold">{item.number}</div>
          <div>{item.month}</div>
        </div>
      ))}

    <input
      type="date"
      value={date}
      onChange={(e) => {
        setDate(e.target.value);
        setIsCustomDate(true);
      }}
      className="px-4 py-3 h-[60px] rounded-xl border border-orange-500 bg-orange-600 text-black outline-none hover:border-white transition duration-300"
    />

  </div>
</div>



        </div>
      </div>
    </div>
  );
}