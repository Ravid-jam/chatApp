const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.error("MongoDB Connect");
    });
    connection.on("error", (err) => {
      console.error("MongoDB Error: ", err);
    });
    console.log("MongoDB connected");
  } catch (e) {
    console.log("Something went wrong", e);
  }
}

module.exports = connectDB;
