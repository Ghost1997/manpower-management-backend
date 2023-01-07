import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo, limitMachine, pageMachine } from "../common/helper.js";
import data from "../common/constant.js";
import moment from "moment";

const addEre = async (req, callback) => {
  const { armyNo, fromDate, toDate } = req.body;
  const today = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createEre = await db.ere.create(req.body);

  if (fromDate && toDate) {
    if (today >= fromDate && today <= toDate) {
      await db.pers.update({ posted: "NO" }, { where: { armyNo } });
    }
  }

  return callback(null, createEre.dataValues);
};

const deleteEreById = async (req, callback) => {
  const { id } = req.query;

  const checkEre = await db.ere.findOne({ raw: true, where: { id } });
  if (!checkEre) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.ere.destroy({ where: { id } });

  return callback(null, {});
};

const editEreById = async (req, callback) => {
  const { id } = req.body;

  const checkEre = await db.ere.findOne({ raw: true, where: { id } });
  if (!checkEre) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};

  const updateEre = await db.ere.update(req.body, { where: { id } });
  if (updateEre) result = await db.ere.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

const addEreInList = async (req, callback) => {
  const addinList = await db.ereList.create(req.body);
  return callback(null, addinList.dataValues);
};

const listAllEreInList = async (req, callback) => {
  const ereList = await db.ereList.findAll();
  return callback(null, ereList);
};

const getAllEre = async (req, callback) => {
  const { pageNo, pageLimit, coy = "", pl = "", name = "", onEre = false, duration = "" } = req.body;
  const { limit, offset } = limitMachine(pageNo, pageLimit, data.PAGE_LIMIT);

  const today = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
  const whereCondition = {};

  if (coy) whereCondition["$Per.coy$"] = coy;
  if (pl) whereCondition["$Per.pl$"] = pl;
  if (name) whereCondition["unit"] = name;
  if (onEre) {
    whereCondition[db.Op.or] = [
      { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.gte]: today } }] },
      { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.eq]: null } }] },
    ];
  }
  if (duration) {
    whereCondition[db.Op.and] = [
      {
        [db.Op.or]: [
          { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.gte]: today } }] },
          { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.eq]: null } }] },
        ],
      },
      {
        where: db.sequelize.where(db.sequelize.fn("TIMESTAMPDIFF", db.sequelize.literal("month"), db.sequelize.col("from_date"), db.sequelize.fn("NOW")), {
          [db.Op.gte]: duration,
        }),
      },
    ];
  }
  const { count, rows } = await db.ere.findAndCountAll({
    limit,
    offset,
    where: whereCondition,
    include: [{ model: db.pers, attributes: ["armyNo", "coy", "pl", "name", "rank"] }],
  });

  return callback(null, {
    ...pageMachine(count, pageNo, limit, rows.length),
    eres: rows,
  });
};

export default { addEre, deleteEreById, editEreById, addEreInList, listAllEreInList, getAllEre };
