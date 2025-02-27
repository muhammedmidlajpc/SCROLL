const mongoose = require("mongoose");
const tweetmodel = require("../models/tweet.model");
const cloudinary = require("../config/cloudinary");

module.exports.posttweetimg = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const msg = req.body.content;
    const uploadResult = await cloudinary.uploader.upload(req.body.image, {
      folder: "tweets"
    });
    console.log(uploadResult);
    const tweet = {
      user_id: req.body.user_id,
      content: msg,
      image: uploadResult.secure_url
    };
    await tweetmodel.create(tweet);
    res.status(200).json({ message: "Tweet posted successfully", tweet });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
module.exports.posttweet = async (req, res) => {
  try {
    console.log("ff", req.body);
    const msg = req.body.content;
    const tweet = {
      user_id: req.body.user_id,
      content: msg
    };
    await tweetmodel.create(tweet);
    res.status(200).json({ message: "Tweet posted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
module.exports.gettweets = async (req, res) => {
  try {
    const tweets = await tweetmodel.find().populate("user_id");
    res.status(200).json({ tweets });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
module.exports.replyToTweet = async (req, res) => {
  try {
    console.log("dafa", req.body);
    tweetid = req.body.tweetid;
    const reply = req.body.content;
    const Reply = {
      user_id: req.body.user_id,
      content: reply
    };
    console.log(Reply);
    await tweetmodel.updateOne(
      { _id: tweetid },
      { $push: { reply: { user_id: Reply.user_id, content: Reply.content } } }
    );
    res.status(200).json({ message: "reply posted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
module.exports.deleteTweet = async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params;
    console.log(id);
    await tweetmodel.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Tweet deleted successfully",status:true });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
