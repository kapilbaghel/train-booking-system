"use client"
import StationSearch from "@/components/StationSearch";
import Navbar from "@/components/Navbar";
import InfoCard from "@/components/Herocard";
import PopularRoutes from "@/components/PopularRoutes";

export default function Home(){


  return(
    <div>
      <Navbar/>
      <InfoCard/>
      <StationSearch/>
      <PopularRoutes/>
    </div>
  )
}