import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { sendPasswordChangedEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await ConnectDB();

    const { email, otp, newPassword } = await req.json();

    // 1. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 2. Check OTP
    if (user.otp !== otp) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // 3. Check expiry
    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return NextResponse.json(
        { message: "OTP expired" },
        { status: 400 }
      );
    }

    // 4. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. Update password & clear OTP
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    // 6. SEND SUCCESS EMAIL (IMPORTANT ADDITION)
    await sendPasswordChangedEmail(email);

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
 }
}