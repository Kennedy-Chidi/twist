const express = require("express");
const upload = require("../config/multer");
const deleteFile = require("../utils/deleteFile");
const authController = require("../controllers/authController");
const emailController = require("../controllers/emailController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", authController.login);
router.route("/get-user").get(authController.getAUser);
router.route("/activate-user/:id").patch(authController.activateAUser);
router.route("/reset/:id").patch(userController.resetUser);

router.route("/related/:username").get(userController.getRelatedData);

router.get("/search-user/:number", userController.searchUser);

router
  .route("/update-password")
  .patch(authController.protect, authController.updatePassword);

router.route("/forgotten-password").patch(authController.forgotPassword);
router.route("/reset-password/:token").patch(authController.resetPassword);

router.post(
  "/signup",
  upload.upload.fields([{ name: "profilePicture" }, { name: "idPicture" }]),
  authController.signup
);

router.route("/").get(userController.getAllUsers);

router
  .route("/edit-user/:id")
  .patch(
    upload.upload.fields([{ name: "profilePicture" }, { name: "idPicture" }]),
    userController.editAUser
  );

router
  .route("/:id")
  .get(userController.getAUser)
  .patch(
    authController.protect,
    upload.upload.single("image"),
    userController.editUser,
    deleteFile
  )
  .delete(
    authController.protect,
    // authController.restrictTo("room"),
    userController.deleteUser,
    userController.getAllUsers
  );

module.exports = router;
