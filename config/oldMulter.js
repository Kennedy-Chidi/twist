let multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    // generate the public name, removing problematic characters
    const originalName = encodeURIComponent(
      path.parse(file.originalname).name
    ).replace(/[^a-zA-Z0-9]/g, "");
    const timestamp = Date.now();
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, originalName + "_" + timestamp + extension);
  },
});
const UPLOAD_DIR = "/temp/";
const fileFilter = (req, file, cb) => {
  if (fs.existsSync(path.join(UPLOAD_DIR, file.originalName))) {
    console.log("skipped");
    cb(null, false);
    return;
  }
  // if (
  //   file.mimetype === "audio/mpeg" ||
  //   file.mimetype === "audio/wave" ||
  //   file.mimetype === "audio/wav" ||
  //   file.mimetype === "audio/mp3"
  // ) {
  //   cb(null, true);
  // } else {
  //   cb(null, false);
  // }
};
exports.upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  //fileFilter,

  // fileFilter: fileFilter,
});
