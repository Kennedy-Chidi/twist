const express = require("express");
const cardController = require("../controllers/cardController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(upload.upload.single("cardImage"), cardController.createCard)
  .get(cardController.getCard);

router
  .route("/:id")
  .patch(upload.upload.single("cardImage"), cardController.updateCard)
  .delete(cardController.deleteCard);

module.exports = router;
