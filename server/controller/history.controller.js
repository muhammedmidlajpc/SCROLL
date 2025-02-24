const mongoose = require("mongoose");
const historyModel = require("../models/history.model");
const e = require("express");

module.exports.saveHistory = async (req, res) => {
  try {
    const History = req.body[0];
    const history = await historyModel.findOne({
      user_id: History.user_id,
      file: History.file
    });
    if (history) {
      res.status(200).json({ message: "already in history!" });
    } else {
      await historyModel.create(History);
      res.status(200).json({ message: "success!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(error).json({ message: error.message });
  }
};
module.exports.getHistory = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    const history = await historyModel.find({ user_id: user_id });
    if (history) {
      res.status(200).json({ message: "History", data: history });
    }
  } catch (error) {
    console.log(error.message);
    res.status(error).json({ message: error.message });
  }
};
