const express = require("express");

const { connectToMongoDb } = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const app = express();
const PORT = 8001;

app.use(express.json());

app.use("/url", urlRoute);

app.use("/", urlRoute);

connectToMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected!!")
);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
