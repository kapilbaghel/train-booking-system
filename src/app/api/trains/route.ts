import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/db";
import Train from "@/models/Train";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  try {
    await ConnectDB();

    console.log("API HIT");

    console.time("paytm-api");

const res = await fetch(
  `https://travel.paytm.com/api/trains/v5/search?departureDate=${date}&destination=${to}&dimension114=seo-home&isAscOfferEligible=false&isH5=true&is_new_user=null&quota=GN&show_empty=true&source=${from}&client=web&deviceIdentifier=Mozilla%20Firefox-147.0.0.0`,
  {
    cache: "no-store",
  }
);

console.timeEnd("paytm-api");

    if (!res.ok) {
      throw new Error(`Paytm API Error: ${res.status}`);
    }

    const data = await res.json();

    const trains = data.body?.trains || [];

    console.log("TOTAL TRAINS:", trains.length);

    if (trains.length > 0) {
      const operations = trains.map((train: any) => ({
        updateOne: {
          filter: {
            trainNumber: train.trainNumber,
          },
          update: {
            $setOnInsert: {
              trainName: train.trainName,
              trainNumber: train.trainNumber,
              source: train.source,
              source_name:
                train.source_name || train.source,
              destination:
                train.destination,
              destination_name:
                train.destination_name ||
                train.destination,
              departure: new Date(
                train.departure
              ),
              arrival: new Date(
                train.arrival
              ),
              duration: train.duration,
              classes:
                train.classes || [],
            },
          },
          upsert: true,
        },
      }));

      await Train.bulkWrite(operations);
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("FULL ERROR:", err);

    return NextResponse.json(
      {
        message: "Failed to fetch trains",
      },
      {
        status: 500,
      }
    );
  }
}