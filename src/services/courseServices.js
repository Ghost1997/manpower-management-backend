import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo, limitMachine, pageMachine } from "../common/helper.js";
import data from "../common/constant.js";
import moment from "moment";

const addCourse = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const createCourse = await db.course.create(req.body);

  return callback(null, createCourse.dataValues);
};

const deleteCourseById = async (req, callback) => {
  const { id } = req.query;

  const checkCourse = await db.course.findOne({ raw: true, where: { id } });
  if (!checkCourse) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  await db.course.destroy({ where: { id } });

  return callback(null, {});
};

const editCourseById = async (req, callback) => {
  const { id } = req.body;

  const checkCourse = await db.course.findOne({ raw: true, where: { id } });
  if (!checkCourse) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};

  const updateCourse = await db.course.update(req.body, { where: { id } });
  if (updateCourse) result = await db.course.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

const getAllCourse = async (req, callback) => {
  const { fromDate = "", toDate = "", course = "", grading = "", coy = "", pl = "", onCourse = false, rank = "", pageNo, pageLimit } = req.body;
  const { limit, offset } = limitMachine(pageNo, pageLimit, data.PAGE_LIMIT);

  const today = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
  const whereCondition = {};
  if (course) whereCondition["course"] = course;
  if (grading) whereCondition["grading"] = grading;
  if (coy) whereCondition["$Per.coy$"] = coy;
  if (pl) whereCondition["$Per.pl$"] = pl;
  if (rank && rank === "JCO") whereCondition["$Per.rank$"] = { [db.Op.gte]: 6 };
  if (rank && rank === "ORS") whereCondition["$Per.rank$"] = { [db.Op.lt]: 6 };
  if (fromDate && toDate) {
    whereCondition["fromDate"] = {
      [db.Op.between]: [fromDate, toDate],
    };
  }
  if (onCourse) {
    whereCondition[db.Op.or] = [
      { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.gte]: today } }] },
      { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.eq]: null } }] },
    ];
  }
  const { count, rows } = await db.course.findAndCountAll({
    limit,
    offset,
    where: whereCondition,
    order: [["fromDate", "DESC"]],
    include: [{ model: db.pers, attributes: ["armyNo", "coy", "pl", "name", "rank"] }],
  });

  return callback(null, {
    ...pageMachine(count, pageNo, limit, rows.length),
    courses: rows,
  });
};

const addCourseInList = async (req, callback) => {
  const addinList = await db.courseList.create(req.body);
  return callback(null, addinList.dataValues);
};

const listAllCourseInList = async (req, callback) => {
  const courseList = await db.courseList.findAll();
  return callback(null, courseList);
};

export default { addCourse, deleteCourseById, editCourseById, getAllCourse, addCourseInList, listAllCourseInList };
