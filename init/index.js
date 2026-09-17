const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function initDB() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");

  const ownerUsername = process.env.OWNER_USERNAME;
  if (!ownerUsername) {
    throw new Error(
      "Set OWNER_USERNAME to the username that should own the sample listings."
    );
  }

  const owner = await User.findOne({ username: ownerUsername });
  if (!owner) {
    throw new Error(`User "${ownerUsername}" was not found.`);
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