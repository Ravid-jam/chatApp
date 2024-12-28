// api/index.js
const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

// Define your routes
app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Wrap the app with serverless-http
module.exports.handler = serverless(app);
