const express = require("express");
const accountController = require("../controllers/accountController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(accountController.createAccount)
  .get(accountController.getAccount);

router
  .route("/:id")
  .get(accountController.getAnAccount)
  .patch(
    // authController.protect,
    accountController.updateAccount
  )
  .delete(
    // authController.protect,
    // authController.restrictTo("room"),
    accountController.deleteAccount
  );

module.exports = router;
