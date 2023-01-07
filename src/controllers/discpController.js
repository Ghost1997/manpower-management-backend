import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import discpService from "../services/discpServices.js";

const addDiscp = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    charge: Joi.string().required(),
    punishment: Joi.string().required(),
    type: Joi.string().required(),
    date: Joi.date().raw().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    discpService.addDiscp(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteDiscpById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    discpService.deleteDiscpById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editDiscpById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    charge: Joi.string().required(),
    punishment: Joi.string().required(),
    type: Joi.string().required(),
    date: Joi.date().raw().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    discpService.editDiscpById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addDiscp, deleteDiscpById, editDiscpById };
