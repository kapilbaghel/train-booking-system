import { NextResponse } from "next/server";

import Train from "@/models/Train";

import {ConnectDB} from "@/lib/db"

export async function POST(req: Request) {

  try {

    await ConnectDB();

    const body = await req.json();

    const savedTrain = await Train.create(body);

    return NextResponse.json({
      success: true,
      data: savedTrain,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });
  }
}