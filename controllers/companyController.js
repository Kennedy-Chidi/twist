const Company = require("../models/companyModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createCompany = catchAsync(async (req, res, next) => {
  const company = await Company.find();
  const savedFields = req.body;

  if (company.length > 0) {
    return next(new AppError("Sorry you can only create one company", 500));
  }

  //  ----------------SETTING SOCIAL ICONS--------------
  const socialArray = [];
  let socialTextArray = [];
  if (!Array.isArray(req.body.socialText)) {
    socialTextArray.push(req.body.socialText);
  } else {
    socialTextArray = req.body.socialText;
  }
  for (let i = 0; i < req.files.socialIcon.length; i++) {
    const socialObj = {
      icon: "",
      text: "",
    };

    socialObj.icon = req.files.socialIcon[i].filename;
    socialObj.text = socialTextArray[i];

    socialArray.push(socialObj);
  }
  savedFields.socials = socialArray;

  //  --------------------------------------------------

  //  -----------SETTING SOCIAL COLORED ICONS-----------
  const coloredSocialArray = [];
  let coloredSocialTextArray = [];
  if (!Array.isArray(req.body.coloredSocialText)) {
    coloredSocialTextArray.push(req.body.coloredSocialText);
  } else {
    coloredSocialTextArray = req.body.coloredSocialText;
  }
  for (let i = 0; i < req.files.coloredSocialIcon.length; i++) {
    const socialObj = {
      icon: "",
      text: "",
    };

    socialObj.icon = req.files.coloredSocialIcon[i].filename;
    socialObj.text = coloredSocialTextArray[i];

    coloredSocialArray.push(socialObj);
  }
  savedFields.coloredSocials = coloredSocialArray;
  //  --------------------------------------------------

  //  ----------------SETTING MEDIA ICONS--------------
  const mediaArray = [];
  let mediaTextArray = [];
  if (!Array.isArray(req.body.mediaText)) {
    mediaTextArray.push(req.body.mediaText);
  } else {
    mediaTextArray = req.body.mediaText;
  }
  for (let i = 0; i < req.files.mediaIcon.length; i++) {
    const mediaObj = {
      icon: "",
      text: "",
    };

    mediaObj.icon = req.files.mediaIcon[i].filename;
    mediaObj.text = mediaTextArray[i];

    mediaArray.push(mediaObj);
  }
  savedFields.media = mediaArray;
  //  --------------------------------------------------

  //  ------------SETTING MEDIA COLORED ICONS-----------
  const coloredMediaArray = [];
  let coloredMediaTextArray = [];
  if (!Array.isArray(req.body.coloredMediaText)) {
    coloredMediaTextArray.push(req.body.coloredMediaText);
  } else {
    coloredMediaTextArray = req.body.coloredMediaText;
  }
  for (let i = 0; i < req.files.coloredMediaIcon.length; i++) {
    const mediaObj = {
      icon: "",
      text: "",
    };

    mediaObj.icon = req.files.coloredMediaIcon[i].filename;
    mediaObj.text = coloredMediaTextArray[i];

    coloredMediaArray.push(mediaObj);
  }
  savedFields.coloredMedia = coloredMediaArray;
  //  --------------------------------------------------

  const newCompany = await Company.create(savedFields);

  res.status(200).json({
    status: "success",
    data: newCompany,
  });
});

exports.getCompany = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Company.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const features = result.paginate();

  const company = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: company,
  });
});

exports.updateCompany = catchAsync(async (req, res, next) => {
  const makeArrays = (iconText, title) => {
    let IconTextArray = [];
    let TitleArray = [];

    if (!Array.isArray(iconText)) {
      IconTextArray.push(iconText);
    } else {
      IconTextArray = iconText;
    }

    if (!Array.isArray(title)) {
      TitleArray.push(title);
    } else {
      TitleArray = title;
    }

    return [IconTextArray, TitleArray];
  };

  let filesToDelete = [];
  let socialArray = [];

  let socialIconArray =
    req.body.socialIcon != undefined
      ? makeArrays(req.body.socialIcon, req.body.socialText)[0]
      : [];
  let socialTextArray = makeArrays(req.body.socialIcon, req.body.socialText)[1];

  let coloredSocialArray = [];
  let coloredSocialIconArray =
    req.body.coloredSocialIcon != undefined
      ? makeArrays(req.body.coloredSocialIcon, req.body.coloredSocialText)[0]
      : [];
  let coloredSocialTextArray = makeArrays(
    req.body.coloredSocialIcon,
    req.body.coloredSocialText
  )[1];

  let mediaArray = [];
  let mediaIconArray =
    req.body.mediaIcon != undefined
      ? makeArrays(req.body.mediaIcon, req.body.mediaText)[0]
      : [];
  let mediaTextArray = makeArrays(req.body.mediaIcon, req.body.mediaText)[1];

  let coloredMediaArray = [];
  let coloredMediaIconArray =
    req.body.coloredMediaIcon != undefined
      ? makeArrays(req.body.coloredMediaIcon, req.body.coloredMediaText)[0]
      : [];
  let coloredMediaTextArray = makeArrays(
    req.body.coloredMediaIcon,
    req.body.coloredMediaText
  )[1];

  let oldCompany = await Company.findById(req.params.id);

  let allowedFields = {
    socials: "",
  };

  const addFileName = (socialFiles, socialIconArray) => {
    if (socialFiles) {
      for (let i = 0; i < socialFiles.length; i++) {
        socialIconArray.push(socialFiles[i].filename);
      }
    }
  };

  const addBodyName = (bodyArray, iconTextArray, titleArray) => {
    for (let i = 0; i < iconTextArray.length; i++) {
      const socialObj = {
        icon: "",
        text: "",
      };

      socialObj.icon = iconTextArray[i];
      socialObj.text = titleArray[i];

      bodyArray.push(socialObj);
    }
  };

  //1A) FIRST COLLECT THE MODIFIED SOCIAL OBJECTS IN THE FILES
  addFileName(req.files.socialIcon, socialIconArray);

  //1B) COLLECT THE UNMODIFIED SOCIAL OBJECTS IN THE BODY
  addBodyName(socialArray, socialIconArray, socialTextArray);

  allowedFields.socials = socialArray;

  /////////////////////////////////////////////////////////////

  //2A) COLLECT THE MODIFIED SOCIAL COLORED OBJECTS IN THE FILES
  addFileName(req.files.coloredSocialIcon, coloredSocialIconArray);

  //2B) COLLECT THE UNMODIFIED SOCIAL COLORED OBJECTS IN THE BODY
  addBodyName(
    coloredSocialArray,
    coloredSocialIconArray,
    coloredSocialTextArray
  );

  allowedFields.coloredSocials = coloredSocialArray;
  ////////////////////////////////////////////////////////////

  //3A) COLLECT THE MODIFIED MEDIA OBJECTS IN THE FILES
  addFileName(req.files.mediaIcon, mediaIconArray);

  //3B) COLLECT THE UNMODIFIED MEDIA OBJECTS IN THE BODY
  addBodyName(mediaArray, mediaIconArray, mediaTextArray);

  allowedFields.media = mediaArray;
  //////////////////////////////////////////////////////////////

  //4A) COLLECT THE MODIFIED MEDIA COLORED OBJECTS IN THE FILES
  addFileName(req.files.coloredMediaIcon, coloredMediaIconArray);

  //4B) COLLECT THE UNMODIFIED MEDIA COLORED OBJECTS IN THE BODY
  addBodyName(coloredMediaArray, coloredMediaIconArray, coloredMediaTextArray);

  allowedFields.coloredMedia = coloredMediaArray;
  allowedFields.companyName = req.body.companyName;
  allowedFields.companyAccountName = req.body.companyAccountName;
  allowedFields.companyAccountNumber = req.body.companyAccountNumber;
  allowedFields.companyBankName = req.body.companyBankName;
  allowedFields.systemEmail = req.body.systemEmail;

  const newCompany = await Company.findByIdAndUpdate(
    req.params.id,
    allowedFields,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  const oldIcons = () => {
    const array = [];
    oldCompany.socials.forEach((el) => {
      array.push(el.icon);
    });
    oldCompany.coloredSocials.forEach((el) => {
      array.push(el.icon);
    });
    oldCompany.media.forEach((el) => {
      array.push(el.icon);
    });
    oldCompany.coloredMedia.forEach((el) => {
      array.push(el.icon);
    });
    return array;
  };

  const newIcons = () => {
    const array = [];
    newCompany.socials.forEach((el) => {
      array.push(el.icon);
    });
    newCompany.coloredSocials.forEach((el) => {
      array.push(el.icon);
    });
    newCompany.media.forEach((el) => {
      array.push(el.icon);
    });
    newCompany.coloredMedia.forEach((el) => {
      array.push(el.icon);
    });
    return array;
  };

  oldIcons().forEach((el) => {
    if (!newIcons().includes(el)) {
      filesToDelete.push(el);
    }
  });

  req.fileNames = filesToDelete;

  next();
});
