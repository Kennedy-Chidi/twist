const express = require("express");
const faqController = require("../controllers/faqController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").post(faqController.createFAQ).get(faqController.getFAQ);

router
  .route("/:id")
  .patch(
    // authController.protect,
    faqController.updateFAQ
  )
  .delete(
    // authController.protect,
    // authController.restrictTo("room"),
    faqController.deleteFAQ
  );

module.exports = router;
