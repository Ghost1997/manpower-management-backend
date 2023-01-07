import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import leaveService from "../services/leaveServices.js";

const addLeave = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    type: Joi.string().required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().allow(""),
    days: Joi.number().allow(""),
    year: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  leaveService.addLeave(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const deleteLeaveById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  leaveService.deleteLeaveById(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const editLeaveById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    type: Joi.string().required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().allow(""),
    days: Joi.number().allow(""),
    year: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  leaveService.editLeaveById(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const getAllLeavesByPersId = async (req, res) => {
  const persId = req.query;
  const schema = Joi.object({ persId: Joi.number().required() });

  const { error } = schema.validate(persId);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }
  leaveService.getAllLeavesByPersId(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};
const getAllLeave = async (req, res) => {
  const schema = Joi.object({
    pageNo: Joi.number().empty([""]).default(0),
    pageLimit: Joi.number(),
    coy: Joi.string().allow(""),
    pl: Joi.string().allow(""),
    type: Joi.string().allow(""),
    onLeave: Joi.boolean().allow(""),
    year: Joi.number().allow(""),
    month: Joi.number().allow(""),
    daysAvailed: Joi.number().allow(""),
    rank: Joi.string().valid("JCO", "ORS").allow(""),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    leaveService.getAllLeave(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addLeave, deleteLeaveById, editLeaveById, getAllLeavesByPersId, getAllLeave };
