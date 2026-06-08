import { NextRequest, NextResponse } from "next/server";

import { ConnectDB } from "@/lib/db";
import Train from "@/models/Train";

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams;

  const from = searchParams.get("from");
  const to = searchParams.get("to");
 const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  try {

    // CONNECT MONGODB
    await ConnectDB();

    console.log("API HIT");

    // FETCH TRAINS
    const res = await fetch(
      `https://travel.paytm.com/api/trains/v5/search?departureDate=${date}&destination=${to}&dimension114=seo-home&isAscOfferEligible=false&isH5=true&is_new_user=null&quota=GN&show_empty=true&source=${from}&client=web&deviceIdentifier=Mozilla%20Firefox-147.0.0.0`
    );

    const data = await res.json();

    const trains = data.body?.trains || [];

    console.log("TOTAL TRAINS:", trains.length);

    // SAVE DATA IN MONGODB
    for (const train of trains) {

      try {

        const trainData = {

          trainName:
            train.trainName,

          trainNumber:
            train.trainNumber,

          source:
            train.source,

          source_name:
            train.source_name || train.source,

          destination:
            train.destination,

          destination_name:
            train.destination_name || train.destination,

          departure:
            new Date(train.departure),

          arrival:
            new Date(train.arrival),

          duration:
            train.duration,

          classes:
            train.classes || [],
        };

        // CHECK DUPLICATE TRAIN
        const existingTrain =
          await Train.findOne({
            trainNumber: train.trainNumber,
          });

        // SAVE ONLY IF NOT EXISTS
        if (!existingTrain) {

          await Train.create(trainData);

          console.log(
            "TRAIN SAVED:",
            train.trainName
          );

        } else {

          console.log(
            "TRAIN ALREADY EXISTS:",
            train.trainName
          );
        }

      } catch (saveError) {

        console.log(
          "SAVE ERROR:",
          saveError
        );
      }
    }

    return NextResponse.json(data);

  } catch (err) {

    console.log("FULL ERROR:", err);

    return NextResponse.json(
      {
        message: "failed to fetch trains",
      },
      {
        status: 500,
      }
    );
  }
}