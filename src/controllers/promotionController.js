import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import promotionService from "../services/promotionServices.js";

const addPromotion = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    toRank: Joi.number().required(),
    date: Joi.date().raw().required(),
    newArmyNo: Joi.string().min(8).allow(""),
    newCoy: Joi.string().allow(""),
    newPl: Joi.string().allow(""),
    newAppt: Joi.string().allow(""),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    promotionService.addPromotion(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deletePromotionById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    promotionService.deletePromotionById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editPromotionById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    fromRank: Joi.number().allow(""),
    toRank: Joi.number().required(),
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
    promotionService.editPromotionById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addPromotion, deletePromotionById, editPromotionById };
