import message from "../common/errorMessage.js";
import Joi from "joi";
import sendResponse from "../common/response.js";
import analyticService from "../services/analyticService.js";

const companySummery = async (req, res) => {
  analyticService.companySummery(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};
const paradeState = async (req, res) => {
  analyticService.paradeState(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const leaveSummery = async (req, res) => {
  analyticService.leaveSummery(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};

const upcomingBirthday = async (req, res) => {
  analyticService.upcomingBirthday(req, (err, response) => {
    if (err) return sendResponse.serverError(res, err);
    return sendResponse.ok(res, response);
  });
};
export default { companySummery, paradeState, leaveSummery, upcomingBirthday };
