import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/db";
import User from "@/models/User";
import { sendOTPEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const { email } = await req.json();

    console.log("EMAIL RECEIVED:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("GENERATED OTP:", otp);

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();
    await sendOTPEmail(email, otp);


    console.log("AFTER SAVE USER:", user);

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}