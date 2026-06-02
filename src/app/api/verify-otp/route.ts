import { NextResponse } from "next/server";
import {ConnectDB} from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const { email, otp } = await req.json();

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 2. Check OTP match
    if (user.otp !== String(otp)) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // 3. Check expiry
    if (user.otpExpiry < new Date()) {
      return NextResponse.json(
        { message: "OTP expired" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}