import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import db from "./config/database.js";
import serverConfig from "./config/serverConfig.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";

import authCheck from "./middlewares/authCheck.js";
import rateLimiter from "./middlewares/rateLimitter.js";
import errorHandler from "./middlewares/errorHandler.js";
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

db.connect()
  .then(async () => {
    serverConfig(server);
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });
app.use(rateLimiter)


app.use("/api/auth", authRoute);

app.use("/api/user",userRoute);

app.use(errorHandler)

