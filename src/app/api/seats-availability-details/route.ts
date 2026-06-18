import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const body = await req.json();

    const booking = await Booking.create(body);

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save booking",
      },
      { status: 500 }
    );
  }
}