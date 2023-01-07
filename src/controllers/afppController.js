import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import afppService from "../services/afppServices.js";

const addAfpp = async (req, res) => {
  const schema = Joi.array().items(
    Joi.object({
      armyNo: Joi.string().min(8).required(),
      openingBal: Joi.number().required(),
      closingBal: Joi.number().required(),
      amount: Joi.number().required(),
      date: Joi.date().raw().required(),
    })
  );
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  afppService.addAfpp(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const deleteAfppById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  afppService.deleteAfppById(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const editAfppById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    openingBal: Joi.number().required(),
    closingBal: Joi.number().required(),
    amount: Joi.number().required(),
    date: Joi.date().raw().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }

  afppService.editAfppById(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const getAllAfppByPersId = async (req, res) => {
  const persId = req.query;
  const schema = Joi.object({ persId: Joi.number().required() });

  const { error } = schema.validate(persId);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }
  afppService.getAllAfppByPersId(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

export default { addAfpp, deleteAfppById, editAfppById, getAllAfppByPersId };
