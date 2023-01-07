import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import personService from "../services/personService.js";

const addPerson = async (req, res) => {
  const { body } = req;

  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    rank: Joi.number().required(),
    appt: Joi.string().allow(""),
    name: Joi.string().min(3).required(),
    dob: Joi.date().raw().required(),
    doe: Joi.date().raw().required(),
    icard: Joi.string().required(),
    aadhar: Joi.number().required(),
    pan: Joi.string().allow(""),
    phone: Joi.number().required(),
    coy: Joi.string().required(),
    pl: Joi.string().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    bank: Joi.string().required(),
    account: Joi.string().required(),
    father: Joi.string().min(3).required(),
    mother: Joi.string().min(3).required(),
    wife: Joi.string().allow(""),
    class: Joi.string().required(),
    posted: Joi.string().valid("YES", "NO", "ESM", "NRU").required(),
    education: Joi.number().required(),
    medCat: Joi.string().min(10).required(),
    bloodGroup: Joi.string()
      .regex(/(A|B|AB|O)[+-]/)
      .required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    personService.addPerson(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const getPersonById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    personService.getPersonById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deletePersonById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    personService.deletePersonById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editPersonById = async (req, res) => {
  const { body } = req;

  const schema = Joi.object({
    id: Joi.number().required(),
    armyNo: Joi.string().min(8).required(),
    appt: Joi.string().allow(""),
    rank: Joi.number().required(),
    name: Joi.string().min(3).required(),
    dob: Joi.date().raw().required(),
    doe: Joi.date().raw().required(),
    icard: Joi.string().required(),
    aadhar: Joi.number().required(),
    pan: Joi.string().allow(""),
    phone: Joi.number().required(),
    coy: Joi.string().required(),
    pl: Joi.string().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    bank: Joi.string().required(),
    account: Joi.string().required(),
    father: Joi.string().min(3).required(),
    mother: Joi.string().min(3).required(),
    wife: Joi.string().allow(""),
    class: Joi.string().required(),
    posted: Joi.string().valid("YES", "NO", "ESM", "NRU").required(),
    education: Joi.number().required(),
    medCat: Joi.string().min(10).required(),
    bloodGroup: Joi.string()
      .regex(/(A|B|AB|O)[+-]/)
      .required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    personService.editPersonById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const getAllPerson = async (req, res) => {
  const schema = Joi.object({
    pageNo: Joi.number().empty([""]).default(0),
    pageLimit: Joi.number(),
    search: Joi.string().allow(""),
    coy: Joi.string().allow(""),
    pl: Joi.string().allow(""),
    rank: Joi.number().allow(""),
    posted: Joi.string().valid("YES", "NO", "ESM", "NRU").allow(""),
    serviceBracketFrom: Joi.number().allow(""),
    serviceBracketTo: Joi.number().allow(""),
    classes: Joi.string().allow(""),
    fromAge: Joi.number().allow(""),
    toAge: Joi.number().allow(""),
    state: Joi.string().allow(""),
    married: Joi.boolean().allow(""),
    lmc: Joi.object({
      temporary: Joi.boolean().allow(""),
      permanent: Joi.boolean().allow(""),
    }).allow(""),
    bloodGroup: Joi.string()
      .regex(/(A|B|AB|O)[+-]/)
      .allow(""),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    personService.getAllPerson(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const checkArmyNoExist = async (req, res) => {
  const schema = Joi.object({ armyNo: Joi.string().min(8).required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    personService.checkArmyNoExist(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const exportGetAllPerson = async (req, res) => {
  const schema = Joi.object({
    pageNo: Joi.number().empty([""]).default(0),
    pageLimit: Joi.number(),
    search: Joi.string().allow(""),
    coy: Joi.string().allow(""),
    pl: Joi.string().allow(""),
    rank: Joi.number().allow(""),
    posted: Joi.string().valid("YES", "NO", "ESM", "NRU").allow(""),
    serviceBracketFrom: Joi.number().allow(""),
    serviceBracketTo: Joi.number().allow(""),
    classes: Joi.string().allow(""),
    fromAge: Joi.number().allow(""),
    toAge: Joi.number().allow(""),
    state: Joi.string().allow(""),
    married: Joi.boolean().allow(""),
    lmc: Joi.object({
      temporary: Joi.boolean().allow(""),
      permanent: Joi.boolean().allow(""),
    }).allow(""),
    bloodGroup: Joi.string()
      .regex(/(A|B|AB|O)[+-]/)
      .allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    personService.getAllPerson(req, async (err, response) => {
      if (err) return sendResponse.serverError(res, err);

      const result = await personService.exportGetAllPerson(response.persons);
      return sendResponse.ok(res, result);
    });
  }
};

export default { addPerson, getPersonById, deletePersonById, editPersonById, getAllPerson, checkArmyNoExist, exportGetAllPerson };
