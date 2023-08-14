const Email = require("../models/emailModel");
const Company = require("../models/companyModel");
const SendEmail = require("../utils/email");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createEmail = catchAsync(async (req, res) => {
  const { doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8, doc9, doc10 } =
    req.body;

  const emails = await Email.create([
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
    doc9,
    doc10,
  ]);

  res.status(200).json({
    status: "success",
    // data: emails,
  });
});

exports.getEmails = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Email.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const features = result.paginate();

  const email = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: email,
  });
});

exports.updateEmail = catchAsync(async (req, res, next) => {
  let filesToDelete = [];
  let allowedFields = req.body;

  if (req.file) {
    allowedFields.banner = req.file.filename;
    const oldEmail = await Email.findById(req.params.id);
    filesToDelete.push(oldEmail.banner);
  }

  const email = await Email.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;

  next();
});

exports.sendEmail = catchAsync(async (req, res, next) => {
  const { users, email } = req.body;

  const from = `info@zivikbank.com`;

  users.forEach((user) => {
    try {
      const resetURL = `${req.protocol}://${req.get("host")}/${req.url}`;
      const banner = `${req.protocol}://${req.get("host")}/${req.url}/uploads/${
        email.banner
      }`;
      new SendEmail(
        from,
        user,
        email.name,
        email.title,
        banner,
        email.content,
        email.headerColor,
        email.footerColor,
        email.mainColor,
        email.greeting,
        email.warning
      ).sendEmail();
    } catch (err) {
      return next(
        new AppError(
          `There was an error sending the email. Try again later!, ${err}`,
          500
        )
      );
    }
  });

  res.status(200).json({
    status: "success",
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const data = req.body;
  const from = `${data.email}`;

  const email = await Email.findOne({ name: "message" });

  const user = {
    email: "info@zivikbank.com",
    username: "ZivikBank",
  };
  try {
    const banner = `${req.protocol}://${req.get("host")}/${req.url}/uploads/${
      email.banner
    }`;
    new SendEmail(
      from,
      user,
      email.name,
      email.title,
      banner,
      data.content,
      email.headerColor,
      email.footerColor,
      email.mainColor,
      email.greeting,
      email.warning
    ).sendEmail();
  } catch (err) {
    return next(
      new AppError(
        `There was an error sending the email. Try again later!, ${err}`,
        500
      )
    );
  }

  res.status(200).json({
    status: "success",
  });
});

exports.deleteEmail = catchAsync(async (req, res, next) => {
  const filesToDelete = [];

  const email = await Email.findById(req.params.id);

  await Email.findByIdAndDelete(req.params.id);

  if (!email) {
    return next(new AppError("No email found with that ID", 404));
  }

  filesToDelete.push(email.banner);

  req.fileNames = filesToDelete;

  next();
});

exports.sendTransactionEmail = catchAsync(async (user, type, amount, pin) => {
  console.log(type, amount, pin);
  // const email = await Email.findOne({ title: type });
  // const company = await Company.find();

  // // const from = `${company[0].systemEmail}`;
  // const from = `info@zivikbank.com`;
  // const content = email.content
  //   .replace("{{amount}}", amount)
  //   .replace("{{pin}}", pin)
  //   .replace("{{currency}}", account.currency);
  // try {
  //   // const resetURL = `${req.protocol}://${req.get("host")}/${req.url}`;
  //   const resetURL = `https://zivikbank.com`;
  //   const banner = `https://zivikbank.com/uploads/${email.banner}`;
  //   new SendEmail(
  //     from,
  //     user,
  //     email.name,
  //     email.title,
  //     banner,
  //     content,
  //     email.headerColor,
  //     email.footerColor,
  //     email.mainColor,
  //     email.greeting,
  //     email.warning,
  //     resetURL
  //   ).sendEmail();
  // } catch (err) {
  //   return `There was an error sending the email. Try again later!, ${err}`;
  // }
});
