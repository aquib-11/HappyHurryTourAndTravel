import { body, param, validationResult } from "express-validator";
import { badRequestErr } from "../errors/customErors.js";
import { JOB_STATUS, JOB_TYPE, PROJECT_TYPE } from "../utils/contants.js";
import mongoose, { Types } from "mongoose";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMsgs = errors.array().map((err) => err.msg);
        throw new badRequestErr(errorMsgs);
      }
      next();
    },  
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new badRequestErr("invalid id");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new badRequestErr("email already exist");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("password").notEmpty().withMessage("password is required"),
]);

//project validation

export const validateProjectInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("desc").notEmpty().withMessage("desc is required"),
  body("technologyUsed").notEmpty().withMessage("technologyUsed is required"),
  body("address").notEmpty().withMessage("address is required"),

  body("projectType")
    .isIn(Object.values(PROJECT_TYPE))
    .withMessage("invalid project type value"),
]);

//techstack validation

export const validateTechstackInput = withValidationErrors([
  body("type").notEmpty().withMessage("type is required"),
  body("title").notEmpty().withMessage("title is required"),
  body("language").notEmpty().withMessage("language is required"),
  body("address").notEmpty().withMessage("address is required"),
]);

//inbox validation

export const validateInboxInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("message").notEmpty().withMessage("message is required"),
  body("subject").notEmpty().withMessage("subject is required"),
]);

// experience validation

export const validateExprienceInput = withValidationErrors([
  body("post").notEmpty().withMessage("post is required"),
  body("company").notEmpty().withMessage("company is required"),
  body("address").notEmpty().withMessage("address is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("desc").notEmpty().withMessage("desc is required"),
  body("startDate").notEmpty().withMessage("StartDate is required"),
  body("endDate").notEmpty().withMessage("endDate is required"),
]);
// certification validation

export const validateCertificationInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("address").notEmpty().withMessage("address is required"),
  body("desc").notEmpty().withMessage("desc is required"),
  body("organisation").notEmpty().withMessage("organisation is required"),
  body("credentialId").notEmpty().withMessage("credentialId is required"),
]);
