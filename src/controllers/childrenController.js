import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import childrenServices from "../services/childrenServices.js";

const addChild = async (req, res) => {
  const schema = Joi.array().items(
    Joi.object({
      armyNo: Joi.string().min(8).required(),
      child: Joi.boolean().required(),
      name: Joi.string().required(),
      dob: Joi.date().raw().required(),
      school: Joi.string().required(),
    })
  );
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    childrenServices.addChild(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteChildById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    childrenServices.deleteChildById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editChildById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    child: Joi.boolean().required(),
    name: Joi.string().required(),
    dob: Joi.date().raw().required(),
    school: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    childrenServices.editChildById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addChild, deleteChildById, editChildById };
