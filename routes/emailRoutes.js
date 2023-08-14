const express = require("express");
const emailController = require("../controllers/emailController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();

router.post("/send-email", emailController.sendEmail);
router.post("/send-message", emailController.sendMessage);

router.route("/").post(emailController.createEmail).get(
  // authController.protect,
  emailController.getEmails
);

router.route("/:id").patch(
  // authController.protect,
  upload.upload.single("banner"),
  emailController.updateEmail,
  deleteFile
);

module.exports = router;
