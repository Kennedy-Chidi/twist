const About = require("../models/aboutModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createAbout = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.certificate = req.file.filename;
  }

  const about = await About.create(req.body);

  res.status(200).json({
    status: "success",
    data: about,
  });
});

exports.getAbout = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(About.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const features = result.paginate();

  const about = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: about,
  });
});

exports.updateAbout = catchAsync(async (req, res, next) => {
  let filesToDelete = [];
  let allowedFields = req.body;

  console.log(req.body, req.file);

  if (req.file) {
    allowedFields.certificate = req.file.filename;
    const oldAbout = await About.findById(req.params.id);
    filesToDelete.push(oldAbout.certificate);
  }

  await About.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;

  next();
});
