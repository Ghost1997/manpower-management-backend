import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import cadreService from "../services/caderServices.js";

const addCadre = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    cadre: Joi.string().required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().required(),
    year: Joi.number().required(),
    result: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    cadreService.addCadre(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteCadreById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    cadreService.deleteCadreById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editCadreById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    cadre: Joi.string().required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().required(),
    year: Joi.number().required(),
    result: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    cadreService.editCadreById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const getAllCadre = async (req, res) => {
  const schema = Joi.object({
    pageNo: Joi.number().empty([""]).default(0),
    pageLimit: Joi.number(),
    cadre: Joi.string().allow(""),
    result: Joi.boolean().allow(""),
    coy: Joi.string().allow(""),
    onCadre: Joi.boolean().allow(""),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    cadreService.getAllCadre(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const addCadreInList = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    cadreService.addCadreInList(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const listAllCadreInList = async (req, res) => {
  cadreService.listAllCadreInList(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

export default { addCadre, deleteCadreById, editCadreById, getAllCadre, addCadreInList, listAllCadreInList };
