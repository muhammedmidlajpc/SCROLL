const mongoose = require("mongoose");
const historySchema = mongoose.Schema(
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
const historyModel = mongoose.model("history", historySchema);
module.exports = historyModel;
