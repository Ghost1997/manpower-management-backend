import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo, limitMachine, pageMachine } from "../common/helper.js";
import data from "../common/constant.js";
import moment from "moment";

const addAtt = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createAtt = await db.att.create(req.body);

  return callback(null, createAtt.dataValues);
};

const deleteAttById = async (req, callback) => {
  const { id } = req.query;

  const checkAtt = await db.att.findOne({ raw: true, where: { id } });
  if (!checkAtt) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.att.destroy({ where: { id } });

  return callback(null, {});
};

const editAttById = async (req, callback) => {
  const { id } = req.body;
  const checkAtt = await db.att.findOne({ raw: true, where: { id } });
  if (!checkAtt) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};
  const updateAtt = await db.att.update(req.body, { where: { id } });
  if (updateAtt[0]) result = await db.att.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

const getAllAtt = async (req, callback) => {
  const { pageNo, pageLimit, coy = "", pl = "", name = "", onAtt = false, duration = "" } = req.body;
  const { limit, offset } = limitMachine(pageNo, pageLimit, data.PAGE_LIMIT);

  const today = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
  const whereCondition = {};

  if (coy) whereCondition["$Per.coy$"] = coy;
  if (pl) whereCondition["$Per.pl$"] = pl;
  if (name) whereCondition["unit"] = name;
  if (onAtt) {
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

  const { count, rows } = await db.att.findAndCountAll({
    limit,
    offset,
    where: whereCondition,
    include: [{ model: db.pers, attributes: ["armyNo", "coy", "pl", "name", "rank"] }],
  });

  return callback(null, {
    ...pageMachine(count, pageNo, limit, rows.length),
    atts: rows,
  });
};

export default { addAtt, deleteAttById, editAttById, getAllAtt };
