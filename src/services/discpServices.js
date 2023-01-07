import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addDiscp = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createDiscp = await db.discp.create(req.body);

  return callback(null, createDiscp.dataValues);
};

const deleteDiscpById = async (req, callback) => {
  const { id } = req.query;

  const checkDiscp = await db.discp.findOne({ raw: true, where: { id } });
  if (!checkDiscp) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.discp.destroy({ where: { id } });

  return callback(null, {});
};

const editDiscpById = async (req, callback) => {
  const { id } = req.body;

  const checkDiscp = await db.discp.findOne({ raw: true, where: { id } });
  if (!checkDiscp) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};

  const updateDiscp = await db.discp.update(req.body, { where: { id } });
  if (updateDiscp) result = await db.discp.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addDiscp, deleteDiscpById, editDiscpById };
