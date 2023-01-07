import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addAfpp = async (req, callback) => {
  const dataToBeCreated = [];
  for (const data of req.body) {
    const { armyNo } = data;
    const personInfo = await getPersonIdByArmyNo(armyNo);

    if (!personInfo) return callback({ message: message.armyNoNotFound(armyNo), statusCode: message.BAD_REQUEST_CODE });

    data.persId = personInfo.id;
    dataToBeCreated.push(data);
  }

  const createAfpp = await db.afpp.bulkCreate(dataToBeCreated);

  return callback(null, createAfpp);
};

const deleteAfppById = async (req, callback) => {
  const { id } = req.query;

  const checkAfpp = await db.afpp.findOne({ raw: true, where: { id } });
  if (!checkAfpp) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.afpp.destroy({ where: { id } });

  return callback(null, {});
};

const editAfppById = async (req, callback) => {
  const { id } = req.body;
  const checkAfpp = await db.afpp.findOne({ raw: true, where: { id } });
  if (!checkAfpp) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};
  const updateAfpp = await db.afpp.update(req.body, { where: { id } });
  if (updateAfpp[0]) result = await db.afpp.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

const getAllAfppByPersId = async (req, callback) => {
  const { persId } = req.query;
  const getAllAfpp = await db.afpp.findAll({ raw: true, where: { persId } });
  return callback(null, getAllAfpp);
};

export default { addAfpp, deleteAfppById, editAfppById, getAllAfppByPersId };
