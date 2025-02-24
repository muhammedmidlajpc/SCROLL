const express = require("express");
const router = express.Router();
const tweetimg = require("../middleware/tweet.middleware");
const tweetcontroller=require("../controller/tweet.controller")

router.post("/tweetimg", tweetimg.single("image"),tweetcontroller.posttweetimg);
router.post("/tweet",tweetcontroller.posttweet);
router.delete("/tweet/:id",tweetcontroller.deleteTweet);
router.get("/tweet",tweetcontroller.gettweets);
router.post("/reply",tweetcontroller.replyToTweet)

module.exports = router;
