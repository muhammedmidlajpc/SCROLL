const express = require("express");
const router = express.Router();
const chatcontroller = require("../controller/chat.controller");

router.get("/getusers/:id", chatcontroller.getusers);
router.post("/chat", chatcontroller.postchat);
router.get("/chat", chatcontroller.getchat);

module.exports = router;
