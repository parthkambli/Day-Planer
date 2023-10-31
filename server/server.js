import path from "path";
import express from "express";
import dotenv, { config } from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

// Import routes
import worksRoute from "./routes/works.js";
import booksRoute from "./routes/books.js";
import workoutsRoute from "./routes/workouts.js";

// Express app
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/works", worksRoute);
app.use("/api/books", booksRoute);
app.use("/api/workouts", workoutsRoute);

const Port = process.env.PORT;

app.listen(Port, console.log(`Server running on port ${Port}`));
