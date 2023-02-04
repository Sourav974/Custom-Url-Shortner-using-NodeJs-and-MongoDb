const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const { connectToMongoDb } = require("./connect");
const URL = require("./models/url");

const urlRoute = require("./routes/url"); // all routes related to url
const staticRoute = require("./routes/StaticRouter"); // all routes for server side rendering is Static Routes
const userRoute = require("./routes/user"); // All routes related to user





const app = express();
const PORT = 8001;


// Connection to MongoDb
connectToMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected!!")
);

// Setting the views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home");
});


app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
