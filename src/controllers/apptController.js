import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import apptService from "../services/apptService.js";

const addApptInList = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(message.BAD_REQUEST_CODE).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  } else {
    apptService.addApptInList(req, (err, response) => {
      if (err) return sendResponse.serverError(res, err);
      return sendResponse.ok(res, response);
    });
  }
};

const listAllApptInList = async (req, res) => {
  apptService.listAllApptInList(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

export default { listAllApptInList, addApptInList };
