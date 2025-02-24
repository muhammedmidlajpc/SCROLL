const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const covercontroller = require("../controller/cover.controller");

router.post("/cover", upload.single("image"), covercontroller.cover);
router.get("/cover",covercontroller.getcover)

module.exports = router;
