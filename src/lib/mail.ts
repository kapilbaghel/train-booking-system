import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTPEmail(
  email: string,
  otp: string
) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Password Reset Request</h2>
        <p>Your OTP for password reset is:</p>

        <h1 style="letter-spacing: 5px;">
          ${otp}
        </h1>

        <p>This OTP is valid for 10 minutes.</p>

        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
    `,
  });
}

//password changed email;
export async function sendPasswordChangedEmail(email: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Changed Successfully",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>✅ Password Updated</h2>
        <p>Your password has been changed successfully.</p>

        <p>If this was not you, please secure your account immediately.</p>
      </div>
    `,
  });
}