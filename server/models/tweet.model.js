const mongoose = require("mongoose");
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
    reply: [
      {
        user_id: { type: String, required: true },
        content: { type: String }
      },
      { timestamp: true }
    ]
  },
  { timestamp: true }
);
const tweetModel = mongoose.model("tweet", tweetSchema);
module.exports = tweetModel;
