import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import attService from "../services/attServices.js";

const addAtt = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    unit: Joi.string().required(),
    location: Joi.string().required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().allow(""),
    employment: Joi.string().required(),
    auth: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    attService.addAtt(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteAttById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  attService.deleteAttById(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const editAttById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    unit: Joi.string().required(),
    location: Joi.string().required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().allow(""),
    employment: Joi.string().required(),
    auth: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  attService.editAttById(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const getAllAtt = async (req, res) => {
  const schema = Joi.object({
    pageNo: Joi.number().empty([""]).default(0),
    pageLimit: Joi.number(),
    coy: Joi.string().allow(""),
    pl: Joi.string().allow(""),
    name: Joi.string().allow(""),
    onAtt: Joi.boolean().allow(""),
    duration: Joi.number().allow(""),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    attService.getAllAtt(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addAtt, deleteAttById, editAttById, getAllAtt };
