import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({

    trainNumber: String,
    trainName: String,
    source: String,
    destination: String,
    classType: String,


    name: String,
    age: Number,
    gender: String,
    phone: Number,
    email: String,
    berthPreference:String,
},{
    timestamps:true
})

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);