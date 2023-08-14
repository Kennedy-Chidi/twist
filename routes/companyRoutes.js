const express = require("express");
const companyController = require("../controllers/companyController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");
const deleteFile = require("../utils/deleteFile");

const router = express.Router();
router
  .route("/")
  .post(
    upload.upload.fields([
      { name: "socialIcon", maxCount: 20 },
      { name: "coloredSocialIcon", maxCount: 20 },
      { name: "mediaIcon", maxCount: 20 },
      { name: "coloredMediaIcon", maxCount: 20 },
    ]),
    companyController.createCompany
  )
  .get(companyController.getCompany);

router.route("/:id").patch(
  // authController.protect,
  upload.upload.fields([
    { name: "socialIcon", maxCount: 20 },
    { name: "coloredSocialIcon", maxCount: 20 },
    { name: "mediaIcon", maxCount: 20 },
    { name: "coloredMediaIcon", maxCount: 20 },
  ]),
  companyController.updateCompany,
  deleteFile
);

module.exports = router;
