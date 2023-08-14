const Blog = require("../models/blogModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createBlog = catchAsync(async (req, res) => {
  req.body.banner = req.file.filename;

  const blog = await Blog.create(req.body);

  res.status(200).json({
    status: "success",
    data: blog,
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Blog.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const blog = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: blog,
    length: resultLen.length,
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.banner = req.file.filename;
  }
  await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.getABlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: blog,
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return next(new AppError("No blog found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
  });
});
