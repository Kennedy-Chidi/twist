const Currency = require("../models/currencyModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createCurrency = catchAsync(async (req, res, next) => {
  const allowedFields = req.body;
  if (req.file) {
    allowedFields.symbol = req.file.filename;
  }
  const currency = await Currency.create(allowedFields);

  next();
});

exports.getCurrencies = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Currency.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const currencies = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: currencies,
    length: resultLen.length,
  });
});

exports.updateCurrency = catchAsync(async (req, res, next) => {
  let filesToDelete = [];
  let allowedFields = req.body;

  if (req.file) {
    allowedFields.symbol = req.file.filename;
    const oldPlan = await Currency.findById(req.params.id);
    filesToDelete.push(oldPlan.planBanner);
  }

  await Currency.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;

  next();
});

exports.toggleCurrencyStatus = catchAsync(async (req, res, next) => {
  await Currency.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteCurrency = catchAsync(async (req, res, next) => {
  const filesToDelete = [];

  const currency = await Currency.findById(req.params.id);

  await Currency.findByIdAndDelete(req.params.id);

  if (!currency) {
    return next(new AppError("No currency found with that ID", 404));
  }

  filesToDelete.push(currency.symbol);

  req.fileNames = filesToDelete;

  next();
});
