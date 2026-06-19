import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    // MongoDB Connect
    await ConnectDB();

    // Frontend se aaya hua data
    const data = await req.json();

    // Booking MongoDB me save karna
    const booking = await Booking.create({
      // Booking Details
      bookingId: `BK${Date.now()}`,

      pnr: Math.floor(
        1000000000 + Math.random() * 9000000000
      ).toString(),

      // Train Details
      trainNumber: data.train.trainNumber,
      trainName: data.train.trainName,
      source: data.train.source,
      destination: data.train.destination,

      classType: data.journey.classType,
      selectedDate: data.journey.date,
      quota: data.journey.quota,

      // Passenger Details
      passengers: data.passengers,

      // Contact Details
      contact: {
        phone: data.contact.mobile,
        email: data.contact.email,
      },

      // Fare Details
      fare: {
        baseFare: data.fare.baseFare,
        reservationCharge: data.fare.reservationCharge,
        superfastCharge: data.fare.superfastCharge,
        gst: data.fare.gst,
        totalFare: data.fare.totalFare,
      },

      // Payment Details
      payment: {
        status: "SUCCESS",
        paymentId: `PAY${Date.now()}`,
        method: "UPI",
      },

      // Booking Status
      bookingStatus: "CONFIRMED",
    });

    return NextResponse.json(
      {
        success: true,
        booking,
        message: "Booking Confirmed Successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Booking Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Booking Failed",
      },
      { status: 500 }
    );
  }
}