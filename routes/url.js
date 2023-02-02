const express = require("express");

const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectUrl,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleRedirectUrl);

module.exports = router;
