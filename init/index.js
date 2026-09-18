

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") }); // Load .env from root

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function initDB() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");

  const ownerUsername = process.env.OWNER_USERNAME || "admin"; // Fallback username agar env na mile
  
  const owner = await User.findOne({ username: ownerUsername });
  if (!owner) {
    throw new Error(`User "${ownerUsername}" was not found in DB.`);
  }

  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: owner._id,
  }));

  await Listing.insertMany(initData.data);
  console.log("data was initialized");

  await mongoose.connection.close();
}

initDB().catch((err) => {
  console.error("Database initialization failed:", err);
});