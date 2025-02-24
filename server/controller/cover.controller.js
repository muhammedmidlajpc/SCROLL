const covermodel = require("../models/cover.model");
const path = require("path");
module.exports.cover = async (req, res) => {
  console.log("first");
  console.log(req.file);
  console.log(req.body);

  const cover = {
    title: req.body.title,
    image: req.file.filename
  };
  await covermodel.create(cover);
  res.status(200).json({ message: "success", data: cover });
};
module.exports.getcover = async (req, res) => {
  // console.log("jg");
  // const cover = await covermodel.find();
  // console.log(cover);
  // console.log(cover)
  // const img = path.join(__dirname, "../images/cover", `${cover.image}`);
  // console.log(img)
  // const obj = { ...cover, img: img };
  // res.status(200).sendFile(obj);

};
