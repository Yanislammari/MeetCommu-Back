import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";

dotenv.config();
const FRONTEND_URL: string = process.env.FRONTEND_URL as string;

const app = express();
app.use(express.json());

app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

(async () => {
  await connectToDatabase();
})();

export default app;
