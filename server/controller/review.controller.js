const reviewmodel = require("../models/review.model");

module.exports.postreview = async (req, res) => {
  try {
    const review = req.body;
    console.log(review);
    await reviewmodel.create(review);
    res.status(200).json({ message: "Review posted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(err.message).json({ message: err.message });
  }
};
module.exports.getreview = async (req, res) => {
  try {
    const { name } = req.params;
    const Reviews = await reviewmodel
      .find({ data_name: name })
      .populate("user_id")
    console.log(Reviews);
    res.status(200).json({ message: "Reviews", data: Reviews });
  } catch (err) {
    console.log(err.message);
    res.status(err.status).json({ message: err.message });
  }
};
module.exports.postreply = async (req, res) => {
  try {
    const reply = {
      review_id: req.body.review_id,
      content: req.body.content,
      user_id: req.body.user_id
    };
    await reviewmodel.updateOne(
      { _id: reply.review_id },
      { $push: { reply: { user_id: reply.user_id, content: reply.content } } }
    );
    res.status(200).json({ message: "Reply posted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(err.status).json({ message: err.message });
  }
};
module.exports.dltreview = async (req, res) => {
  try {
    const { id } = req.params;
    await reviewmodel.findOneAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "review deleted successfully", status: true });
  } catch (err) {
    console.log(err.message);
    res.status(err.status).json({ message: err.message });
  }
};
