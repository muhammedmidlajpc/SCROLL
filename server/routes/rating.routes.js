const express = require("express");
const router = express.Router();
const ratingcontroller = require("../controller/rating.controller");

router.post("/rating", ratingcontroller.rate);
router.get("/rating/:name", ratingcontroller.getrating);
module.exports = router;
