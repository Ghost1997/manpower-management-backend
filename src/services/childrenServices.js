import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addChild = async (req, callback) => {
  const { armyNo } = req.body[0];

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });

  req.body.map((data) => (data.persId = personInfo.id));

  const createChild = await db.children.bulkCreate(req.body);

  return callback(null, createChild);
};

const deleteChildById = async (req, callback) => {
  const { id } = req.query;

  const checkChild = await db.children.findOne({ raw: true, where: { id } });
  if (!checkChild) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.children.destroy({ where: { id } });

  return callback(null, {});
};

const editChildById = async (req, callback) => {
  const { id } = req.body;
  const checkChild = await db.children.findOne({ raw: true, where: { id } });
  if (!checkChild) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};
  const updateChild = await db.children.update(req.body, { where: { id } });
  if (updateChild[0]) result = await db.children.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addChild, deleteChildById, editChildById };
