const mongoose = require("mongoose");
const ratingModel = require("../models/rating.model");

module.exports.rate = async (req, res) => {
  try {
    const Rating = req.body;
    console.log(Rating);
    const ratings = await ratingModel.findOne(Rating);
    if (ratings) {
      await ratingModel.updateOne(
        { user_Id: Rating.user_Id },
        { $set: { rating: Rating.rating } }
      );
      console.log(ratings);
      res.status(200).json({ message: `rated ` });
    } else {
      await ratingModel.create(Rating);
      res.status(201).json({ message: `rated ` });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
module.exports.getrating = async (req, res) => {
  try {
    const { name } = req.params;
    const rating = await ratingModel.aggregate([
      { $match: { data_name: name } },
      { $group: { _id: null, avgrating: { $avg: "$rating" } } }
    ]);
    res.status(200).json({ message: "ratings", rating });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
