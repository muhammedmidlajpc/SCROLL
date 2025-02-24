const mongoose = require("mongoose");
const messageschema = mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    reciver_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    message: {
      type: String
    }
  },
  { timestamp: true }
);
const messagemodel = mongoose.model("chat", messageschema);
module.exports = messagemodel;
