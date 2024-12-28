const http = require("http");
const bodyParser = require("body-parser");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookiesParser = require("cookie-parser");
const socketInit = require("./socket");
const app = express();

const server = http.createServer(app);

app.use(
  cors()
);
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(cookiesParser());

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 10000000,
    limit: "5000mb",
  })
);
const PORT = process.env.PORT || 5002;
app.get("/", (req, res) => {
  res.send("Hello, this is a simple API server!");
});
app.use("/api", router);
connectDB().then(() => {
  server.listen(PORT, () => {
    socketInit(server);
    console.log(`Port: ${PORT}`);
  });
});
