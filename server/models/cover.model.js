const { default: mongoose } = require("mongoose");
const mongoos = require("mongoose");
const coversschema = mongoose.Schema(
  {
    title: {
      type: String
    },
    image: {
      type: String
    }
  },
  { timestamp: true }
);
const covermodel = mongoose.model("cover", coversschema);
module.exports = covermodel;
