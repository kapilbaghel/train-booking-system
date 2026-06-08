"use client"
import StationSearch from "@/components/StationSearch";
import Navbar from "@/components/Navbar";
import InfoCard from "@/components/Herocard";
import PopularRoutes from "@/components/PopularRoutes";
import Footer from "@/components/Footer";

export default function Home(){


  return(
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Navbar/>
      <InfoCard/>
      <StationSearch/>
      <PopularRoutes/>
      <Footer/>
    </div>
  )
}