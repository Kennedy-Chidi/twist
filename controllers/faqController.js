const FAQ = require("../models/faqModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createFAQ = catchAsync(async (req, res) => {
  const faq = await FAQ.create(req.body);

  res.status(200).json({
    status: "success",
    data: faq,
  });
});

exports.getFAQ = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(FAQ.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const faq = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: faq,
    length: resultLen.length,
  });
});

exports.updateFAQ = catchAsync(async (req, res, next) => {
  await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteFAQ = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findById(req.params.id);

  await FAQ.findByIdAndDelete(req.params.id);

  if (!faq) {
    return next(new AppError("No faq found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
  });
});
