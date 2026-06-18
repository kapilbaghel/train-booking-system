import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // Unique Booking Details
    bookingId: {
      type: String,
      required: true,
    },

    pnr: {
      type: String,
      required: true,
    },

    // Train Details
    trainNumber: String,
    trainName: String,
    source: String,
    destination: String,
    classType: String,
    selectedDate: String,

    // User ne kaunsa quota select kiya
    quota: String,

    // Passenger Details (Multiple Passengers)
    passengers: [
      {
        name: String,
        age: Number,
        gender: String,
        berthPreference: String,
      },
    ],

    // Contact Details
    contact: {
      phone: String,
      email: String,
    },

    // Fare Details
    fare: {
      baseFare: Number,
      reservationCharge: Number,
      superfastCharge: Number,
      gst: Number,
      totalFare: Number,
    },

    // Payment Details
    payment: {
      status: {
        type: String,
        default: "SUCCESS",
      },

      paymentId: String,

      method: {
        type: String,
        default: "UPI",
      },
    },

    // Booking Status
    bookingStatus: {
      type: String,
      default: "CONFIRMED",
    },

    // Quota Details (Optional - agar future me use karna ho)
    GN: {
      status: String,
      availableSeats: Number,
      fare: Number,
      prediction: {
        confirmationChance: Number,
        message: String,
      },
    },

    TQ: {
      status: String,
      availableSeats: Number,
      fare: Number,
      prediction: {
        confirmationChance: Number,
        message: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);