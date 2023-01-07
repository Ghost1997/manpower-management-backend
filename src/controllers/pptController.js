import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import pptService from "../services/pptServices.js";

const addPpt = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    date: Joi.date().raw().required(),
    result: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    pptService.addPpt(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deletePptById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    pptService.deletePptById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editPptById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    date: Joi.date().raw().required(),
    result: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    pptService.editPptById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addPpt, deletePptById, editPptById };
