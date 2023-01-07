import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import weaponService from "../services/weaponServices.js";

const addWeapon = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    weapon: Joi.string().required(),
    regnNo: Joi.string().required(),
    issueDate: Joi.date().raw().required(),
    depositedDate: Joi.date().raw().required(),
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
    weaponService.addWeapon(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteWeaponById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    weaponService.deleteWeaponById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editWeaponById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    weapon: Joi.string().required(),
    regnNo: Joi.string().required(),
    issueDate: Joi.date().raw().required(),
    depositedDate: Joi.date().raw().required(),
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
    weaponService.editWeaponById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addWeapon, deleteWeaponById, editWeaponById };
