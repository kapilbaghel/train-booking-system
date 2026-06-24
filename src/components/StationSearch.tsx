"use client";

import { ArrowLeftRight,ArrowUpDown ,CalendarDays, Train } from "lucide-react";
import { useState,useEffect } from "react";
import { useRouter,useSearchParams } from "next/navigation";

type Station = {
  data: {
    code: string;
    display_name: string;
  };
};

export default function StationSearch({buttonText="Search",compact=false,placeholder="Enter station",highlightLabels=false,showHeading=true}:{buttonText?:string;compact?:boolean;placeholder?:string;highlightLabels?:boolean;showHeading?:boolean}) {
  //button text by default "search" dikhai dega and agar koi value aayi jaise <StationSearch buttonText="modifySearch"/>to vo dikhai dega.
  const router = useRouter();

  const searchParams = useSearchParams();
const sourceParam = searchParams.get("source");
const destinationParam = searchParams.get("destination");
const sourceCodeParam = searchParams.get("sourceCode");
const destinationCodeParam = searchParams.get("destinationCode");

  const [fromCity, setFromCity] = useState("");
  const [fromCode, setFromCode] = useState("");

  const [toCity, setToCity] = useState("");
  const [toCode, setToCode] = useState("");

  const [stations, setStations] = useState<Station[]>([]);
  const [toStations, setToStations] = useState<Station[]>([]);

  const [date, setDate] = useState("");
  const [isCustomDate, setIsCustomDate] = useState(false);

  //auto-fill logic

  useEffect(()=>{
    if(sourceParam){
      setFromCity(sourceParam);
    }

    if(destinationParam){
      setToCity(destinationParam)
    }

    if(sourceCodeParam){
      setFromCode(sourceCodeParam);
    }
    if(destinationCodeParam){
      setToCode(destinationCodeParam);
    }
  },[sourceParam,destinationParam,sourceCodeParam,destinationCodeParam])

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
        {showHeading && (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
      <Train className="text-orange-500 w-5 h-5" />
    </div>

    <h2 className="text-white text-lg md:text-xl font-semibold">
      Search Your <span className="text-orange-600">Journey</span>
    </h2>
  </div>
)}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6 items-center">

          {/* FROM */}
          <div className="relative">
           <p
  className={`mb-2 ${
    highlightLabels
      ? "text-orange-500 text-lg "
      : "text-xs text-gray-400"
  }`}
>
              From
            </p>

            <input
              value={truncateText(fromCity, 22)}
              title={fromCity}
              onChange={(e) => fetchStations(e.target.value)}
              placeholder={placeholder}
             className={`w-full truncate outline-none text-white px-3 md:px-4 py-2.5 md:py-3
 ${
    compact
      ? "border-b border-orange-500 rounded-none bg-transparent "
      : "bg-white/5 border border-white/10 focus:border-orange-500/50 rounded-xl"
  }`}
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
          <div className="flex justify-center -my-1 md:my-0">
           <button
  onClick={swapStations}
  className="p-3 rounded-full border border-orange-500/30 text-orange-500 hover:bg-orange-500/10 transition mt-4 md:mt-6"
>
  <span className="block md:hidden">
    <ArrowUpDown />
  </span>

  <span className="hidden md:block">
    <ArrowLeftRight />
  </span>
</button>
          </div>

          {/* TO */}
          <div className="relative">
            <p
  className={`mb-2 ${
    highlightLabels
      ? "text-orange-500 text-lg "
      : "text-xs text-gray-400"
  }`}
>

              To
            </p>

            <input
              value={truncateText(toCity, 22)}
              title={toCity}
              onChange={(e) => fetchToStations(e.target.value)}
              placeholder={placeholder}
              className={`w-full truncate outline-none text-white px-3 md:px-4 py-2.5 md:py-3
  ${
    compact
      ? "border-b border-orange-500 rounded-none bg-transparent "
      : "bg-white/5 border border-white/10 focus:border-orange-500/50 rounded-xl"
  }`}
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
              {buttonText}
            </button>
          </div>

          {/* DATE */}
          {/* DATE */}
<div className="col-span-1 md:col-span-4 mt-4">
<div className="grid grid-cols-3 gap-3 md:flex md:flex-wrap">

    {!isCustomDate &&
      nextFiveDates.map((item) => (
        <div
          key={item.fullDate}
          onClick={() => {
            setDate(item.fullDate);
            setIsCustomDate(false);
          }}
          className={`h-[60px] w-full md:w-[90px] flex flex-col items-center justify-center rounded-lg text-xs text-center cursor-pointer border transition ${
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

    <div
  onClick={() =>
    (
      document.getElementById("customDate") as HTMLInputElement
    )?.showPicker()
  }
  className="h-[60px] w-full md:w-[120px] rounded-lg border border-orange-500 bg-white/5 flex flex-col justify-center items-center cursor-pointer hover:bg-orange-500/10 transition"
>
  <CalendarDays className="w-4 h-4 text-orange-500 mt-[2px]" />

  <span className="text-xs text-white mt-[5px]">
    {isCustomDate && date
      ? new Date(date).toLocaleDateString("en-IN")
      : "Select Date"}
  </span>
</div>

<input
  id="customDate"
  type="date"
  value={date}
  onChange={(e) => {
    setDate(e.target.value);
    setIsCustomDate(true);
  }}
  className="hidden"
/>
  </div>
</div>



        </div>
      </div>
    </div>
  );
}