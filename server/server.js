const express = require("express");
const mongoose = require("mongoose");
const dbconnect = require("./config/db.config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require("./routes/user.routes");
const cover = require("./routes/cover.routes");
const saved = require("./routes/saved.routes");
const history = require("./routes/history.routes");
const rating = require("./routes/rating.routes");
const tweet = require("./routes/tweet.routes");
const chat = require("./routes/chat.routes");
const review = require("./routes/review.routes");
const { app, server } = require("./config/socket");
require("dotenv").config();
// const io = require("socket.io")(process.env.PORT, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true
//   }
// });

// const app = express();

app.use("/images", express.static("./images"));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({ origin: "https://lovely-bavarois-281a44.netlify.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(user);
app.use(cover);
app.use(saved);
app.use(history);
app.use(rating);
app.use(tweet);
app.use(chat);
app.use(review);
dbconnect();

// app.listen(process.env.PORT, (err) => {
//   console.log("Server is running!");
// });
server.listen(process.env.PORT, (err) => {
  console.log("Server is running!");
});
