import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addBpet = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createBpet = await db.bpet.create(req.body);

  return callback(null, createBpet.dataValues);
};

const deleteBpetById = async (req, callback) => {
  const { id } = req.query;

  const checkBpet = await db.bpet.findOne({ raw: true, where: { id } });
  if (!checkBpet) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.bpet.destroy({ where: { id } });

  return callback(null, {});
};

const editBpetById = async (req, callback) => {
  const { id } = req.body;
  const checkBpet = await db.bpet.findOne({ raw: true, where: { id } });
  if (!checkBpet) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};
  const updateBpet = await db.bpet.update(req.body, { where: { id } });
  if (updateBpet[0]) result = await db.bpet.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addBpet, deleteBpetById, editBpetById };
