import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_DATABASE_URI: string = process.env.MONGODB_DATABASE_URI as string;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_DATABASE_URI);
  }
  catch (error) {
    process.exit(1);
  }
}
