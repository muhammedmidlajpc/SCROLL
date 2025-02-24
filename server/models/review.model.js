const mongoose = require("mongoose");

const reviewschema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    data_name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    reply: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        content: {
          type: String
        }
      },
      { timestamp: true }
    ]
  },
  { timestamp: true }
);
const reviewmodel = mongoose.model("review", reviewschema);
module.exports = reviewmodel;
