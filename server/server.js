import path from "path";
import express from "express";
import dotenv, { config } from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

// Express app
const app = express();

// Middlewares
app.use(express.json());

const Port = process.env.PORT;

app.listen(Port, console.log(`Server running on port ${Port}`));
