const express = require("express");
const planController = require("../controllers/planController");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/toggle-status/:id").patch(
  // authController.protect,
  planController.togglePlanStatus
);

router
  .route("/")
  .post(upload.upload.single("planBanner"), planController.createPlan)
  .get(planController.getPlans);

router
  .route("/:id")
  .patch(
    // authController.protect,
    upload.upload.single("planBanner"),
    planController.updatePlan,
    deleteFile
  )
  .delete(
    // authController.protect,
    // authController.restrictTo("room"),
    planController.deletePlan,
    deleteFile
  );

module.exports = router;
