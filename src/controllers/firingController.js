import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import firingService from "../services/firingServices.js";

const addFiring = async (req, res) => {
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
    firingService.addFiring(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteFiringById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    firingService.deleteFiringById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editFiringById = async (req, res) => {
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
    firingService.editFiringById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addFiring, deleteFiringById, editFiringById };
