import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middileware/errorMiddileware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoute.js";
import cors from "cors";
import cloudinary from "cloudinary";
const port = process.env.PORT || 5000;

const app = express();
dotenv.config();
connectDB();

app.use(express.json({ extended: true, limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(cookieParser());
app.use(cors());

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use("/api/users", userRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is started on http://localhost:${port}/`)
);
