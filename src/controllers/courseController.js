import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import courseService from "../services/courseServices.js";

const addCourse = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().required(),
    year: Joi.number().required(),
    course: Joi.string().required(),
    location: Joi.string().required(),
    grading: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    courseService.addCourse(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteCourseById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    courseService.deleteCourseById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editCourseById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().required(),
    year: Joi.number().required(),
    course: Joi.string().required(),
    location: Joi.string().required(),
    grading: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    courseService.editCourseById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const getAllCourse = async (req, res) => {
  const schema = Joi.object({
    pageNo: Joi.number().empty([""]).default(0),
    pageLimit: Joi.number(),
    course: Joi.string().allow(""),
    grading: Joi.array().items(Joi.string().allow("")).allow(""),
    rank: Joi.string().valid("JCO", "ORS").allow(""),
    coy: Joi.string().allow(""),
    pl: Joi.string().allow(""),
    onCourse: Joi.boolean().allow(""),
    fromDate: Joi.string().allow(""),
    toDate: Joi.string().allow(""),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    courseService.getAllCourse(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const addCourseInList = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    courseService.addCourseInList(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const listAllCourseInList = async (req, res) => {
  courseService.listAllCourseInList(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

export default { addCourse, deleteCourseById, editCourseById, getAllCourse, addCourseInList, listAllCourseInList };
