require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const goalRoutes = require("./routes/goals.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/goals", goalRoutes);
app.use("/user", userRoutes);

module.exports = app;
