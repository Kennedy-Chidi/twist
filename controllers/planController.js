const Plan = require("../models/planModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createPlan = catchAsync(async (req, res) => {
  let savedFields = {
    planName: req.body.planName,
    planPeriod: req.body.planPeriod,
    planDuration: req.body.planDuration,
    planPercentage: req.body.planPercentage,
    planMinimum: req.body.planMinimum,
    planMaximum: req.body.planMaximum,
    planBanner: req.file.filename,
    planDescription: req.body.planDescription,
    planTags: req.body.planTags,
  };

  const plan = await Plan.create(savedFields);

  res.status(200).json({
    status: "success",
    data: plan,
  });
});

exports.getPlans = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Plan.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const plans = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: plans,
    length: resultLen.length,
  });
});

exports.updatePlan = catchAsync(async (req, res, next) => {
  let filesToDelete = [];
  let allowedFields = {
    planName: req.body.planName,
    planPeriod: req.body.planPeriod,
    planDuration: req.body.planDuration,
    planPercentage: req.body.planPercentage,
    planMinimum: req.body.planMinimum,
    planMaximum: req.body.planMaximum,
    planDescription: req.body.planDescription,
    planTags: req.body.planTags,
  };

  if (req.file) {
    allowedFields.planBanner = req.file.filename;
    const oldPlan = await Plan.findById(req.params.id);
    filesToDelete.push(oldPlan.planBanner);
  }

  await Plan.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;

  next();
});

exports.togglePlanStatus = catchAsync(async (req, res, next) => {
  console.log(req.body);
  await Plan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.deletePlan = catchAsync(async (req, res, next) => {
  const filesToDelete = [];

  const plan = await Plan.findById(req.params.id);

  await Plan.findByIdAndDelete(req.params.id);

  if (!plan) {
    return next(new AppError("No plan found with that ID", 404));
  }

  filesToDelete.push(plan.planBanner);

  req.fileNames = filesToDelete;

  next();
});
