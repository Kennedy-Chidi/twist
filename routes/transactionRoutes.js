const express = require("express");
const transactionController = require("../controllers/transactionController");
const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const router = express.Router();

// router.route("/toggle-status/:id").patch(
//   // authController.protect,
//   transactionController.toggleCurrencyStatus
// );

router.get("/notifications", notificationController.getNotifications);

router.get("/get-volumes", transactionController.getTransactionVolume);

router
  .route("/")
  .post(transactionController.createTransaction)
  .get(transactionController.getTransactions);

router
  .route("/:id")
  .patch(authController.protect, transactionController.approveTransaction)
  .delete(
    // authController.protect,
    // authController.restrictTo("room"),
    transactionController.deleteTransaction
  );

module.exports = router;
