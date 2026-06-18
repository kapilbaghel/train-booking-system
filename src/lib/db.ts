import mongoose from "mongoose";

export async function ConnectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("DB connection error:", err);
    throw err;
  }
}