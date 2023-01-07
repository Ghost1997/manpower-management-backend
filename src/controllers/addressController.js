import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import addressService from "../services/addressServices.js";

const addAddress = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    tehsil: Joi.string().required(),
    policeStation: Joi.string().required(),
    vill: Joi.string().required(),
    pin: Joi.number().required(),
    nrs: Joi.string().required(),
    distFromBorder: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  addressService.addAddress(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const deleteAddressById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  addressService.deleteAddressById(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const editAddressById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    tehsil: Joi.string().required(),
    policeStation: Joi.string().required(),
    vill: Joi.string().required(),
    pin: Joi.number().required(),
    nrs: Joi.string().required(),
    distFromBorder: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  addressService.editAddressById(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

export default { addAddress, deleteAddressById, editAddressById };
