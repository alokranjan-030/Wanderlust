const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; //mongo URL from mongoose doc.

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({}); //this will clean/remove the previous data
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "65a79dde32e8b0b6eb3b1f66",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was inititazed");
};

initDB();
