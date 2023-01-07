import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addSplAttrib = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createSplAttrib = await db.splAttrib.create(req.body);

  return callback(null, createSplAttrib.dataValues);
};

const deleteSplAttribById = async (req, callback) => {
  const { id } = req.query;

  const checkSplAttrib = await db.splAttrib.findOne({ raw: true, where: { id } });
  if (!checkSplAttrib) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.splAttrib.destroy({ where: { id } });

  return callback(null, {});
};

const editSplAttribById = async (req, callback) => {
  const { id } = req.body;

  const checkSplAttrib = await db.splAttrib.findOne({ raw: true, where: { id } });
  if (!checkSplAttrib) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};

  const updateSplAttrib = await db.splAttrib.update(req.body, { where: { id } });
  if (updateSplAttrib) result = await db.splAttrib.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addSplAttrib, deleteSplAttribById, editSplAttribById };
