import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addSickReport = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createSickReport = await db.sickReport.create(req.body);

  return callback(null, createSickReport.dataValues);
};

const deleteSickReportById = async (req, callback) => {
  const { id } = req.query;

  const checkSickReport = await db.sickReport.findOne({ raw: true, where: { id } });
  if (!checkSickReport) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.sickReport.destroy({ where: { id } });

  return callback(null, {});
};

const editSickReportById = async (req, callback) => {
  const { id } = req.body;

  const checkSickReport = await db.sickReport.findOne({ raw: true, where: { id } });
  if (!checkSickReport) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};

  const updateSickReport = await db.sickReport.update(req.body, { where: { id } });
  if (updateSickReport) result = await db.sickReport.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addSickReport, deleteSickReportById, editSickReportById };
