import mongoose, { Document, Schema } from "mongoose";

interface ITrain extends Document {

  trainName: string;

  trainNumber: string;

  source: string;

  source_name: string;

  destination: string;

  destination_name: string;

  departure: Date;

  arrival: Date;

  duration: string;

  classes: string[];
}

const trainSchema = new Schema<ITrain>(
  {
    trainName: {
      type: String,
      required: true,
    },

    trainNumber: {
      type: String,
      required: true,
      unique: true,
    },

    source: {
      type: String,
      required: true,
    },

    source_name: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    destination_name: {
      type: String,
      required: true,
    },

    departure: {
      type: Date,
      required: true,
    },

    arrival: {
      type: Date,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    classes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Train =
  mongoose.models.Train ||
  mongoose.model<ITrain>("Train", trainSchema);

export default Train;