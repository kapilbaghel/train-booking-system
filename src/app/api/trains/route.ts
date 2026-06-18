import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/db";
import Train from "@/models/Train";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const rawDate = searchParams.get("date") || new Date().toISOString().split("T")[0];

  if (!from || !to) {
    return NextResponse.json({ message: "Missing 'from' or 'to' parameters" }, { status: 400 });
  }

  try {
    // 1. CONNECT MONGODB
    await ConnectDB();
    console.log("=== API HIT ===");

    // FIX: Convert "2026-06-19" to "20260619" specifically for Paytm API
    const paytmFormattedDate = rawDate.replaceAll("-", ""); 

    // 2. FETCH TRAINS FROM PAYTM (Using the formatted date)
    const res = await fetch(
      `https://travel.paytm.com/api/trains/v5/search?departureDate=${paytmFormattedDate}&destination=${to}&dimension114=seo-home&isAscOfferEligible=false&isH5=true&is_new_user=null&quota=GN&show_empty=true&source=${from}&client=web&deviceIdentifier=Mozilla%20Firefox-147.0.0.0`
    );

    if (!res.ok) {
      throw new Error(`Paytm API responded with status: ${res.status}`);
    }

    const data = await res.json();
    const trains = data.body?.trains || [];
    console.log("TOTAL TRAINS FETCHED:", trains.length);

    // 3. PREPARE BULK OPERATIONS
    if (trains.length > 0) {
      const bulkOps = trains.map((train: any) => {
        const parsedDeparture = train.departure ? new Date(train.departure) : null;
        const parsedArrival = train.arrival ? new Date(train.arrival) : null;

        const trainData = {
          trainName: train.trainName,
          trainNumber: train.trainNumber,
          source: train.source,
          source_name: train.source_name || train.source,
          destination: train.destination,
          destination_name: train.destination_name || train.destination,
          departure: isNaN(parsedDeparture?.getTime()!) ? null : parsedDeparture,
          arrival: isNaN(parsedArrival?.getTime()!) ? null : parsedArrival,
          duration: train.duration,
          classes: train.classes || [],
        };

        return {
          updateOne: {
            filter: { trainNumber: train.trainNumber },
            update: { $set: trainData },
            upsert: true,
          },
        };
      });

      const bulkResult = await Train.bulkWrite(bulkOps);
      console.log(`DB SYNCED -> Inserted/Upserted: ${bulkResult.upsertedCount}, Modified: ${bulkResult.modifiedCount}`);
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error("FULL ERROR IN TRAIN API:", err);
    return NextResponse.json(
      { message: "failed to fetch trains" },
      { status: 500 }
    );
  }
}