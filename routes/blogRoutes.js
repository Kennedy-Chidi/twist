const express = require("express");
const blogController = require("../controllers/blogController");
const upload = require("../config/multer");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(upload.upload.single("banner"), blogController.createBlog)
  .get(blogController.getBlog);

router
  .route("/:id")
  .get(blogController.getABlog)
  .patch(upload.upload.single("banner"), blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
