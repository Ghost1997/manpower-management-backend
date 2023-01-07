import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addFiring = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createFiring = await db.firing.create(req.body);

  return callback(null, createFiring.dataValues);
};

const deleteFiringById = async (req, callback) => {
  const { id } = req.query;

  const checkFiring = await db.firing.findOne({ raw: true, where: { id } });
  if (!checkFiring) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.firing.destroy({ where: { id } });

  return callback(null, {});
};

const editFiringById = async (req, callback) => {
  const { id } = req.body;

  const checkFiring = await db.firing.findOne({ raw: true, where: { id } });
  if (!checkFiring) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};

  const updateFiring = await db.firing.update(req.body, { where: { id } });
  if (updateFiring) result = await db.firing.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addFiring, deleteFiringById, editFiringById };
