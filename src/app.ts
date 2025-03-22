import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import surveyRoutes from "./routes/surveyRoutes";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173    ",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);
app.use(express.json());
app.use(cookieParser()); 

app.use("/api", surveyRoutes);
app.use("/api/admin", adminRoutes); 


export default app;
