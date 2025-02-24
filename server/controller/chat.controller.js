const mongoose = require("mongoose");
const usermodel = require("../models/user.model");
const messagemodel = require("../models/chat.model");
module.exports.getusers = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await usermodel.find({ _id: { $ne: id } });
    res.status(200).json({ message: "users", data: users });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
module.exports.postchat = async (req, res) => {
  try {
    console.log(req.body);
    const message = {
      sender_id: req.body.sender_id,
      reciver_id: req.body.reciver_id,
      message: req.body.message
    };
    await messagemodel.create(message);
    res.status(200).json({ message: "chat sent successfully!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
module.exports.getchat = async (req, res) => {
  try {
    const { sender_id, reciver_id } = req.query;
    console.log(sender_id, reciver_id);
    if (!sender_id || !reciver_id) {
      return res
        .status(400)
        .json({ message: "sender_id and reciver_id are required" });
    }
    const messages = await messagemodel.find({
      $or: [
        { sender_id: sender_id, reciver_id: reciver_id },
        { sender_id: reciver_id, reciver_id: sender_id }
      ]
    });
    console.log(messages);
    res.status(200).json({ message: "messages", data: messages });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
