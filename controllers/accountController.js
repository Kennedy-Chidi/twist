const Account = require("../models/accountsModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createAccount = catchAsync(async (req, res) => {
  const account = await Account.create(req.body);

  res.status(200).json({
    status: "success",
    data: account,
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Account.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const account = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: account,
    length: resultLen.length,
  });
});

exports.updateAccount = catchAsync(async (req, res, next) => {
  // req.body.bannerImage = JSON.parse(req.body.bannerImage);
  await Account.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findByIdAndDelete(req.params.id);

  if (!account) {
    return next(new AppError("No account found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
  });
});

exports.getAnAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findOne({ username: req.params.id });

  res.status(200).json({
    status: "success",
    data: account,
  });
});
