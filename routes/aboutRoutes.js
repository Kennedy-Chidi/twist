const express = require("express");
const aboutController = require("../controllers/aboutController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router
  .route("/")
  .post(upload.upload.single("certificate"), aboutController.createAbout)
  .get(aboutController.getAbout);

router
  .route("/:id")
  .patch(
    authController.protect,
    upload.upload.single("certificate"),
    aboutController.updateAbout,
    deleteFile
  );

module.exports = router;
