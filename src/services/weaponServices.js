import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addWeapon = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createWeapon = await db.weapon.create(req.body);

  return callback(null, createWeapon.dataValues);
};

const deleteWeaponById = async (req, callback) => {
  const { id } = req.query;

  const checkWeapon = await db.weapon.findOne({ raw: true, where: { id } });
  if (!checkWeapon) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.weapon.destroy({ where: { id } });

  return callback(null, {});
};

const editWeaponById = async (req, callback) => {
  const { id } = req.body;

  const checkWeapon = await db.weapon.findOne({ raw: true, where: { id } });
  if (!checkWeapon) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};

  const updateWeapon = await db.weapon.update(req.body, { where: { id } });
  if (updateWeapon) result = await db.weapon.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addWeapon, deleteWeaponById, editWeaponById };
