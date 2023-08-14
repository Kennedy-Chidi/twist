const express = require("express");
const termsController = require("../controllers/termsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(termsController.createTerms)
  .get(termsController.getTerms);

router
  .route("/:id")
  .patch(
    // authController.protect,
    termsController.updateTerms
  )
  .delete(
    // authController.protect,
    // authController.restrictTo("room"),
    termsController.deleteTerms
  );

module.exports = router;
