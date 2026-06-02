import mongoose, { Schema } from "mongoose";
const OtpSchema = new Schema({
    email:String,
    otp:String,
    expiresAt:Date
});
export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);