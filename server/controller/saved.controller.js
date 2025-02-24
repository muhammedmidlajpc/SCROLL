const mongoose = require("mongoose");
const savedmodel = require("../models/saved.model");

module.exports.save = async (req, res) => {
  console.log(req.body[0]);
  try {
    const Saved = req.body[0];
    console.log(Saved);
    const saved = await savedmodel.findOne({
      file: Saved.file,
      user_id: Saved.user_id
    });
    if (saved) {
      res.status(200).json({ message: "already saved!" });
    } else {
      await savedmodel.create({ user_id: Saved.user_id, file: Saved.file });
      res.status(200).json({ message: "saved successfully!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
module.exports.saved = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    const saved = await savedmodel.find({ user_id: user_id });
    if (saved) {
      res.status(200).json({ message: "saved playlist", data: saved });
    } else {
      res.status(404).json({ message: "not found!" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
