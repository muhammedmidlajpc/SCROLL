const mongoose = require("mongoose");
const ratingSchema = mongoose.Schema(
  {
    user_Id: {
      type: String,
      required: true
    },
    data_name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  },
  { timestamp: true }
);
const ratingModel = mongoose.model("rating", ratingSchema);
module.exports = ratingModel;
