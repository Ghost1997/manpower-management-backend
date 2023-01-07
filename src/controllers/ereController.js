import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import ereServices from "../services/ereServices.js";

const addEre = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().required(),
    unit: Joi.string().required(),
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
    ereServices.addEre(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteEreById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    ereServices.deleteEreById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editEreById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    fromDate: Joi.date().raw().required(),
    toDate: Joi.date().raw().required(),
    unit: Joi.string().required(),
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
    ereServices.editEreById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const addEreInList = async (req, res) => {
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
    ereServices.addEreInList(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const listAllEreInList = async (req, res) => {
  ereServices.listAllEreInList(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const getAllEre = async (req, res) => {
  const schema = Joi.object({
    pageNo: Joi.number().empty([""]).default(0),
    pageLimit: Joi.number(),
    coy: Joi.string().allow(""),
    pl: Joi.string().allow(""),
    name: Joi.string().allow(""),
    onEre: Joi.boolean().allow(""),
    duration: Joi.number().allow(""),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    ereServices.getAllEre(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addEre, deleteEreById, editEreById, addEreInList, listAllEreInList, getAllEre };
