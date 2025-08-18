require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const allowedOrigins = [
  "https://learnly-drab.vercel.app",
  "http://localhost:5173",
];



const authRoutes = require("./routes/auth.routes");
const goalRoutes = require("./routes/goals.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/goals", goalRoutes);
app.use("/user", userRoutes);

module.exports = app;
