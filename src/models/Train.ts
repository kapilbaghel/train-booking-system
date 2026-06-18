import mongoose, { Document, Schema } from "mongoose";

interface IAvailability {
  code: string;
  quota: string;
  status_shortform: string;
  fare: number;
  pnr_prediction?: {
    value: number;
  };
}

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

  availability: IAvailability[];
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

    availability: {
      type: [
        {
          code: String,
          quota: String,
          status_shortform: String,
          fare: Number,
          pnr_prediction: {
            value: Number,
          },
        },
      ],
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