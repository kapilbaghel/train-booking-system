
"use client";
import {useRouter} from "next/navigation";


import Image from "next/image";
import {
  ArrowRight,
  Clock3,
  IndianRupee,
  TrainFront,
} from "lucide-react";

const routes = [
  {
    from: "Delhi",
    fromCode:"NDLS",
    to: "Mumbai",
    toCode:"MMCT",
    duration: "16h 20m",
    price: "1299",
    image:"/routes/d-mumbai.png"
  },
  {
    from: "Delhi",
    fromCode:"NDLS",
    to: "Varanasi",
    toCode:"BSB",
    duration: "08h 45m",
    price: "899",
    image:"/routes/d-varanasi.png"
  },
  {
    from: "Mumbai",
    fromCode:"MMCT",
    to: "Ahmedabad",
    toCode:"ADI",
    duration: "06h 10m",
    price: "699",
    image:"/routes/m-ahmedabad.png"
  },
  {
    from: "Delhi",
    fromCode:"NDLS",
    to: "Lucknow",
    toCode:"LKO",
    duration: "07h 30m",
    price: "799",
    image:"/routes/d-lucknow.png"
  },
  {
    from: "Bhopal",
    fromCode:"BPL",
    to: "Indore",
    toCode:"INDB",
    duration: "03h 15m",
    price: "499",
    image:"/routes/bhopal.png"
  },
  {
    from: "Jaipur",
    fromCode:"JP",
    to: "Udaipur",
    toCode:"UDZ",
    duration: "05h 00m",
    price: "599",
    image:"/routes/jaipur.png"
  },
];

export default function PopularRoutes() {
  const router = useRouter();
  return (
    <section 
    id="popular-routes"
    className="relative w-full py-20 px-6 bg-black overflow-hidden">

      {/* ORANGE GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-400/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-14">
          <p className="text-orange-500 font-medium tracking-widest uppercase mb-3">
            Explore Routes
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Popular Train Routes
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Discover India's most booked train journeys with fast booking,
            real-time seat availability, and premium travel experience.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {routes.map((route, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl cursor-pointer border border-white/10 bg-white/5 backdrop-blur-xl p-7 transition-all duration-500 hover:border-orange-500/50 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,115,0,0.18)]"
            >
<Image src={route.image} alt={`Route from ${route.from} to ${route.to}`} fill priority sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
              {/* CARD GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent" />

              {/* TOP */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-orange-500/15 border border-orange-500/20">
                    <TrainFront className="text-orange-500 w-6 h-6" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Premium Route
                    </p>

                    <h3 className="text-white text-xl font-semibold">
                      Express Journey
                    </h3>
                  </div>
                </div>

                {/* <div className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/70" /> */}
              </div>

              {/* ROUTE */}
              <div className="flex items-center justify-between mt-10 relative z-10">

                <div>
                  {/* <p className="text-gray-500 text-sm mb-1">
                    From
                  </p> */}

                  <h2 className="text-3xl font-bold text-white">
                    {route.from}
                  </h2>
                </div>

                <ArrowRight className="text-orange-500 w-8 h-8 mt-5" />

                <div className="text-right">
                  {/* <p className="text-gray-500 text-sm mb-1">
                    To
                  </p> */}

                  <h2 className="text-3xl font-bold text-white">
                    {route.to}
                  </h2>
                </div>
              </div>

              {/* INFO */}
              <div className="flex items-center justify-between mt-10 relative z-10">

                {/* DURATION */}
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock3 className="w-5 h-5 text-orange-500" />

                  <span>{route.duration}</span>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-1 text-orange-500 font-semibold text-lg">
                  <IndianRupee className="w-5 h-5" />
                  {route.price}
                </div>
              </div>

              {/* BUTTON */}
              <button onClick={()=> router.push(
  `/?source=${route.from}&sourceCode=${route.fromCode}&destination=${route.to}&destinationCode=${route.toCode}#station-search`
)}
               className="relative z-10 mt-8 w-full rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-3 text-black font-semibold text-lg shadow-[0_0_25px_rgba(255,115,0,0.35)]">
                Book Journey
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}