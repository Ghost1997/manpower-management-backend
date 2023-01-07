import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import sickReportService from "../services/sickReportServices.js";

const addSickReport = async (req, res) => {
  const schema = Joi.object({
    armyNo: Joi.string().min(8).required(),
    date: Joi.date().raw().required(),
    symptoms: Joi.string().required(),
    diag: Joi.string().required(),
    advice: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    sickReportService.addSickReport(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const deleteSickReportById = async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required() });

  const { error } = schema.validate(req.query);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    sickReportService.deleteSickReportById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const editSickReportById = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    date: Joi.date().raw().required(),
    symptoms: Joi.string().required(),
    diag: Joi.string().required(),
    advice: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    sickReportService.editSickReportById(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

export default { addSickReport, deleteSickReportById, editSickReportById };
