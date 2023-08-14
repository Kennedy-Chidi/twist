const express = require("express");
const bannerController = require("../controllers/bannerController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(upload.upload.single("bannerImage"), bannerController.createBanner)
  .get(bannerController.getBanner);

router
  .route("/:id")
  .patch(upload.upload.single("bannerImage"), bannerController.updateBanner)
  .delete(bannerController.deleteBanner);

module.exports = router;
