import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addPpt = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createPpt = await db.ppt.create(req.body);

  return callback(null, createPpt.dataValues);
};

const deletePptById = async (req, callback) => {
  const { id } = req.query;

  const checkPpt = await db.ppt.findOne({ raw: true, where: { id } });
  if (!checkPpt) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.ppt.destroy({ where: { id } });

  return callback(null, {});
};

const editPptById = async (req, callback) => {
  const { id } = req.body;

  const checkPpt = await db.ppt.findOne({ raw: true, where: { id } });
  if (!checkPpt) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};

  const updatePpt = await db.ppt.update(req.body, { where: { id } });
  if (updatePpt) result = await db.ppt.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addPpt, deletePptById, editPptById };
