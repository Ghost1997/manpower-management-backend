import adminService from "../services/adminService.js";
import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
const register = async (req, res) => {
  const { body } = req;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  adminService.register(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const login = async (req, res) => {
  const { body } = req;

  const schema = Joi.object({
    email: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  adminService.login(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const getAdminDetail = async (req, res) => {
  adminService.getAdminDetail(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

export default { register, login, getAdminDetail };
