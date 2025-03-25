const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const validationRouter = require("./routes/validationRoutes");
const monitorRouter = require("./routes/monitorRoutes");
const Skin = require("./models/skinSchema"); // Use the updated model
dotenv.config();

/* ------------------------------ Configuration ------------------------------ */

const app = express();
const port = process.env.PORT || 5000; // Fallback to 5000 if PORT is missing
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fallbackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // generous cap
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests. Please try again later.",
});

app.use(fallbackLimiter);

/* ------------------------------- Database -------------------------------- */

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      dbName: dbName,
    });
    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* --------------------------------- Routes --------------------------------- */

// Fetch distinct skin names
app.get("/allSkinNames", async (req, res) => {
  try {
    const skins = await Skin.distinct("skin");
    res.json(skins);
  } catch (error) {
    console.error("Error fetching skins:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all skin data
app.get("/skins", async (req, res) => {
  try {
    const skins = await Skin.find({});
    res.json(skins);
  } catch (error) {
    console.error("Error fetching skins:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/auth", authRouter);
app.use("/validation", validationRouter);
app.use("/monitor", monitorRouter);
