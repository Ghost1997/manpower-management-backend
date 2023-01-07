import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { limitMachine, pageMachine, getPersonIdByArmyNo } from "../common/helper.js";
import data from "../common/constant.js";
import moment from "moment";

const addLeave = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createLeave = await db.leave.create(req.body);

  return callback(null, createLeave.dataValues);
};

const deleteLeaveById = async (req, callback) => {
  const { id } = req.query;

  const checkLeave = await db.leave.findOne({ raw: true, where: { id } });
  if (!checkLeave) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.leave.destroy({ where: { id } });

  return callback(null, {});
};

const editLeaveById = async (req, callback) => {
  const { id } = req.body;
  const checkLeave = await db.leave.findOne({ raw: true, where: { id } });
  if (!checkLeave) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};
  const updateLeave = await db.leave.update(req.body, { where: { id } });
  if (updateLeave[0]) result = await db.leave.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

const getAllLeavesByPersId = async (req, callback) => {
  const { persId } = req.query;

  const getAllLeaves = await db.leave.findAll({ raw: true, where: { persId } });
  return callback(null, getAllLeaves);
};
const getAllLeave = async (req, callback) => {
  const { pageNo, pageLimit, coy = "", pl = "", type = "", onLeave = false, year = "", month = "", daysAvailed = "", rank = "" } = req.body;
  const { limit, offset } = limitMachine(pageNo, pageLimit, data.PAGE_LIMIT);

  const today = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
  const whereCondition = {};
  if (coy) whereCondition["$Per.coy$"] = coy;
  if (pl) whereCondition["$Per.pl$"] = pl;
  if (type) whereCondition["type"] = type;
  if (year) whereCondition["year"] = year;
  if (month) whereCondition["where"] = db.sequelize.where(db.sequelize.fn("month", db.sequelize.col("from_date")), month);
  if (rank && rank === "JCO") whereCondition["$Per.rank$"] = { [db.Op.gte]: 6 };
  if (rank && rank === "ORS") whereCondition["$Per.rank$"] = { [db.Op.lt]: 6 };
  if (onLeave) {
    whereCondition[db.Op.or] = [
      { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.gte]: today } }] },
      { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.eq]: null } }] },
    ];
  }

  const { count, rows } = await db.leave.findAndCountAll({
    limit,
    offset,
    where: whereCondition,
    include: [{ model: db.pers, attributes: ["armyNo", "coy", "pl", "name", "rank"] }],
    order: [["fromDate", "DESC"]],
  });

  return callback(null, {
    ...pageMachine(count, pageNo, limit, rows.length),
    leaves: rows,
  });
};

export default { addLeave, deleteLeaveById, editLeaveById, getAllLeavesByPersId, getAllLeave };
