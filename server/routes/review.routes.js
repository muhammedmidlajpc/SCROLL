const express = require("express");
const router = express.Router();
const reviewcontroller = require("../controller/review.controller");

router.post("/review",reviewcontroller.postreview);
router.post("/review/reply",reviewcontroller.postreply);
router.get("/review/:name",reviewcontroller.getreview);
router.delete("/review/:id",reviewcontroller.dltreview);

module.exports = router;
