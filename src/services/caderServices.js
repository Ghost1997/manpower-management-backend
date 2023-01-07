import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo, limitMachine, pageMachine } from "../common/helper.js";
import data from "../common/constant.js";
import moment from "moment";

const addCadre = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createCadre = await db.cadre.create(req.body);

  return callback(null, createCadre.dataValues);
};

const deleteCadreById = async (req, callback) => {
  const { id } = req.query;

  const checkCadre = await db.cadre.findOne({ raw: true, where: { id } });
  if (!checkCadre) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.cadre.destroy({ where: { id } });

  return callback(null, {});
};

const editCadreById = async (req, callback) => {
  const { id } = req.body;
  const checkCadre = await db.cadre.findOne({ raw: true, where: { id } });
  if (!checkCadre) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};
  const updateCadre = await db.cadre.update(req.body, { where: { id } });
  if (updateCadre[0]) result = await db.cadre.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

const getAllCadre = async (req, callback) => {
  const { cadre = "", result = "", coy, onCadre, pageNo, pageLimit } = req.body;
  const { limit, offset } = limitMachine(pageNo, pageLimit, data.PAGE_LIMIT);

  const whereCondition = {};
  const today = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
  if (cadre) whereCondition["cadre"] = cadre;
  if (typeof result === "boolean") whereCondition["result"] = result;
  if (coy) whereCondition["$Per.coy$"] = coy;
  if (onCadre) {
    whereCondition[db.Op.or] = [
      { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.gte]: today } }] },
      { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.eq]: null } }] },
    ];
  }
  const { count, rows } = await db.cadre.findAndCountAll({
    limit,
    offset,
    where: whereCondition,
    include: [{ model: db.pers, attributes: ["armyNo", "coy", "pl", "name", "rank"] }],
  });

  return callback(null, {
    ...pageMachine(count, pageNo, limit, rows.length),
    cadres: rows,
  });
};

const addCadreInList = async (req, callback) => {
  const addinList = await db.cadreList.create(req.body);
  return callback(null, addinList.dataValues);
};

const listAllCadreInList = async (req, callback) => {
  const cadreList = await db.cadreList.findAll();
  return callback(null, cadreList);
};

export default { addCadre, deleteCadreById, editCadreById, getAllCadre, addCadreInList, listAllCadreInList };
