import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addPromotion = async (req, callback) => {
  const { armyNo, newArmyNo, newCoy, newPl, newAppt, toRank } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });

  req.body.persId = personInfo.id;
  req.body.fromRank = personInfo.rank;

  const createPromotion = await db.promotion.create(req.body);

  const dataToUpdate = { rank: toRank };
  if (newArmyNo) dataToUpdate.armyNo = newArmyNo;
  if (newCoy) dataToUpdate.coy = newCoy;
  if (newPl) dataToUpdate.pl = newPl;
  if (newAppt) dataToUpdate.appt = newAppt;

  await db.pers.update(dataToUpdate, { where: { id: personInfo.id } });

  return callback(null, createPromotion.dataValues);
};

const deletePromotionById = async (req, callback) => {
  const { id } = req.query;

  const checkPromotion = await db.promotion.findOne({ raw: true, where: { id } });
  if (!checkPromotion) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.promotion.destroy({ where: { id } });

  return callback(null, {});
};

const editPromotionById = async (req, callback) => {
  const { id } = req.body;

  const checkPromotion = await db.promotion.findOne({ raw: true, where: { id } });
  if (!checkPromotion) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};

  const updatePromotion = await db.promotion.update(req.body, { where: { id } });
  if (updatePromotion) result = await db.promotion.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addPromotion, deletePromotionById, editPromotionById };
