import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  try {
    // DB connect (optional, but keep if needed later)
    await ConnectDB();

    console.log("API HIT");

    // FETCH FROM PAYTM API
    const res = await fetch(
      `https://travel.paytm.com/api/trains/v5/search?departureDate=${date}&destination=${to}&dimension114=seo-home&isAscOfferEligible=false&isH5=true&is_new_user=null&quota=GN&show_empty=true&source=${from}&client=web&deviceIdentifier=Mozilla%20Firefox-147.0.0.0`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Paytm API Error: ${res.status}`);
    }

    const data = await res.json();

    const trains = data.body?.trains || [];

    console.log("TOTAL TRAINS:", trains.length);

    // 🚀 DIRECT RESPONSE (NO DATABASE SLOWDOWN)
    return NextResponse.json({
      success: true,
      count: trains.length,
      data,
    });

  } catch (err) {
    console.error("ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch trains",
      },
      { status: 500 }
    );
  }
}