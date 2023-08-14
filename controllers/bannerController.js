const Banner = require("../models/bannerModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createBanner = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.bannerImage = req.file.filename;
  }
  const banner = await Banner.create(req.body);

  res.status(200).json({
    status: "success",
    data: banner,
  });
});

exports.getBanner = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Banner.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const banner = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: banner,
    length: resultLen.length,
  });
});

exports.updateBanner = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.bannerImage = req.file.filename;
  }
  await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
  const banner = await Banner.findByIdAndDelete(req.params.id);

  if (!banner) {
    return next(new AppError("No banner found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
  });
});
