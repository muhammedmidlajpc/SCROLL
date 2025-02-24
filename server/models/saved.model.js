const mongoose = require("mongoose");
const savedSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    file: {
      type: Object,
      required: true
    }
  },
  { timestamp: true }
);
const savedModel = mongoose.model("saved", savedSchema);
module.exports = savedModel;
