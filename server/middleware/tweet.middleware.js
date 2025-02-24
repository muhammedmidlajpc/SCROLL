const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/tweetimg");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const tweetimg = multer({ storage: storage });
module.exports = tweetimg;
