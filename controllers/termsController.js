const Terms = require("../models/termsModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createTerms = catchAsync(async (req, res) => {
  const terms = await Terms.create(req.body);

  res.status(200).json({
    status: "success",
    data: terms,
  });
});

exports.getTerms = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Terms.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const terms = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: terms,
    length: resultLen.length,
  });
});

exports.updateTerms = catchAsync(async (req, res, next) => {
  await Terms.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteTerms = catchAsync(async (req, res, next) => {
  const terms = await Terms.findById(req.params.id);

  await Terms.findByIdAndDelete(req.params.id);

  if (!terms) {
    return next(new AppError("No terms found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
  });
});
