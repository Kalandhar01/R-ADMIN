import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("[db] MONGODB_URI is not set. Database features will be unavailable.");
}

export async function connectDB() {
  if (!MONGODB_URI) return false;
  if (mongoose.connection.readyState === 1) return true;
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    return true;
  } catch (error) {
    console.error("[db] MongoDB connection failed:", error);
    return false;
  }
}

export function isConnected() {
  return mongoose.connection.readyState === 1;
}

export default mongoose;
