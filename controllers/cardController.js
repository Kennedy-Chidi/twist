const Card = require("../models/cardModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createCard = catchAsync(async (req, res) => {
  req.body.cardImage = req.file.filename;
  req.body.duration = new Date(req.body.duration).getTime();
  const card = await Card.create(req.body);

  res.status(200).json({
    status: "success",
    data: card,
  });
});

exports.getCard = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Card.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const card = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: card,
    length: resultLen.length,
  });
});

exports.updateCard = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.cardImage = req.file.filename;
  }
  console.log(req.body);
  await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndDelete(req.params.id);

  if (!card) {
    return next(new AppError("No card found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
  });
});
