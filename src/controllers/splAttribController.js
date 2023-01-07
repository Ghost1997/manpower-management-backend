import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import splAttribService from "../services/splAttribServices.js";

const addSplAttrib = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    attrib: Joi.string().required(),
    remark: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    splAttribService.addSplAttrib(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteSplAttribById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    splAttribService.deleteSplAttribById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editSplAttribById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    attrib: Joi.string().required(),
    remark: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    splAttribService.editSplAttribById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addSplAttrib, deleteSplAttribById, editSplAttribById };
