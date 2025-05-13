const mongoose = require("mongoose");
const replySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // This enables population
      required: true
    },
    content: { type: String }
  },
  { timestamps: true }
);
const tweetSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    content: {
      type: String
    },
    image: {
      type: String
    },
    reply: [replySchema]
    
    // [
    //   {
    //     user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    //     content: { type: String }
    //   },
    //   { timestamp: true }
    // ]
  },
  { timestamp: true }
);
const tweetModel = mongoose.model("tweet", tweetSchema);
module.exports = tweetModel;
