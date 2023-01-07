import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import fs from "fs";
import data from "../common/constant.js";
import { limitMachine, pageMachine, generatePDF } from "../common/helper.js";

const addPerson = async (req, callback) => {
  try {
    const { armyNo } = req.body;

    const checkPerson = await db.pers.findOne({ raw: true, where: { armyNo } });
    if (checkPerson) return callback({ message: "PERSON_ALREADY_EXIST", statusCode: message.BAD_REQUEST_CODE });
    if (req.file) req.body.photo = req.file.filename;

    const createPerson = await db.pers.create(req.body);

    return callback(null, createPerson.dataValues);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") return callback(err.errors[0]);
    return callback(err);
  }
};

const getPersonById = async (req, callback) => {
  try {
    const { id } = req.query;

    const checkPerson = await db.pers.findOne({
      where: { id },
      // logging: true,
      include: [
        { model: db.address },
        { model: db.leave },
        { model: db.afpp },
        { model: db.att },
        { model: db.bpet },
        { model: db.cadre },
        { model: db.children },
        { model: db.course },
        { model: db.discp },
        { model: db.ere },
        { model: db.firing },
        { model: db.ppt },
        { model: db.promotion },
        { model: db.sickReport },
        { model: db.splAttrib },
        { model: db.weapon },
      ],
    });
    if (!checkPerson) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

    return callback(null, checkPerson);
  } catch (err) {
    console.log(err);
    return callback(err);
  }
};

const deletePersonById = async (req, callback) => {
  try {
    const { id } = req.query;

    const checkPerson = await db.pers.findOne({ raw: true, where: { id } });
    if (!checkPerson) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });
    if (checkPerson.photo) {
      fs.unlinkSync(`./images/${checkPerson.photo}`);
    }
    await db.pers.destroy({ where: { id } });

    return callback(null, {});
  } catch (err) {
    console.log(err);
    return callback(err);
  }
};

const editPersonById = async (req, callback) => {
  try {
    const { id } = req.body;
    const checkPerson = await db.pers.findOne({ raw: true, where: { id } });
    if (!checkPerson) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

    if (req.file) {
      if (checkPerson.photo) {
        fs.unlinkSync(`./images/${checkPerson.photo}`);
      }

      req.body.photo = req.file.filename;
    }
    let result = {};
    const updatePerson = await db.pers.update(req.body, { where: { id } });
    if (updatePerson[0]) {
      result = await db.pers.findOne({ raw: true, where: { id } });
    }
    return callback(null, result);
  } catch (err) {
    console.log(err);
    return callback(err);
  }
};

const getAllPerson = async (req, callback) => {
  const {
    fromAge = "",
    toAge = "",
    search = "",
    bloodGroup = "",
    coy = "",
    rank = "",
    pl = "",
    posted = "YES",
    serviceBracketFrom = "",
    serviceBracketTo = "",
    classes = "",
    lmc = "",
    state = "",
    married = "",
    pageNo,
    pageLimit,
  } = req.body;

  const { limit, offset } = limitMachine(pageNo, pageLimit, data.PAGE_LIMIT);

  let whereCondition = {};
  if (search) whereCondition = { [db.Op.or]: [{ armyNo: { [db.Op.like]: `%${search}%` } }, { name: { [db.Op.like]: `%${search}%` } }] };
  if (bloodGroup) whereCondition["bloodGroup"] = bloodGroup;
  if (coy) whereCondition["coy"] = coy;
  if (pl) whereCondition["pl"] = pl;
  if (rank) whereCondition["rank"] = rank;
  if (posted) whereCondition["posted"] = posted;
  if (classes) whereCondition["class"] = classes;
  if (state) whereCondition["$Address.state$"] = state;
  if (typeof married === "boolean") {
    married ? (whereCondition["wife"] = { [db.Op.not]: null }) : (whereCondition["wife"] = { [db.Op.eq]: null });
  }
  if (lmc) {
    const { temporary = false, permanent = false } = lmc;
    if (temporary && permanent) {
      whereCondition["medCat"] = { [db.Op.ne]: "S1H1A1P1E1" };
    } else if (temporary) {
      whereCondition["medCat"] = { [db.Op.and]: [{ [db.Op.ne]: "S1H1A1P1E1" }, { [db.Op.notRegexp]: "(P[^P]*){2}" }] };
    } else if (permanent) {
      whereCondition["medCat"] = { [db.Op.and]: [{ [db.Op.ne]: "S1H1A1P1E1" }, { [db.Op.regexp]: "(P[^P]*){2}" }] };
    }
  }
  if (fromAge && toAge) {
    whereCondition.dataDob = db.sequelize.where(db.sequelize.fn("TIMESTAMPDIFF", db.sequelize.literal("year"), db.sequelize.col("dob"), db.sequelize.fn("NOW")), {
      [db.Op.and]: [{ [db.Op.gte]: fromAge }, { [db.Op.lt]: toAge }],
    });
  }
  if (serviceBracketFrom && serviceBracketTo) {
    whereCondition.data = db.sequelize.where(db.sequelize.fn("TIMESTAMPDIFF", db.sequelize.literal("year"), db.sequelize.col("doe"), db.sequelize.fn("NOW")), {
      [db.Op.and]: [{ [db.Op.gte]: serviceBracketFrom }, { [db.Op.lt]: serviceBracketTo }],
    });
  } else if (serviceBracketFrom) {
    whereCondition.data = db.sequelize.where(db.sequelize.fn("TIMESTAMPDIFF", db.sequelize.literal("year"), db.sequelize.col("doe"), db.sequelize.fn("NOW")), {
      [db.Op.gte]: serviceBracketFrom,
    });
  } else if (serviceBracketTo) {
    whereCondition.data = db.sequelize.where(db.sequelize.fn("TIMESTAMPDIFF", db.sequelize.literal("year"), db.sequelize.col("doe"), db.sequelize.fn("NOW")), {
      [db.Op.lt]: serviceBracketTo,
    });
  }

  const orderMethod = [[db.Sequelize.literal("coy='HQ', coy='SP', coy='D', coy='C', coy='B',coy='A'")], ["rank", "DESC"], ["armyNo", "DESC"]];

  const { count, rows } = await db.pers.findAndCountAll({
    limit,
    offset,
    include: [{ model: db.address }],
    where: whereCondition,
    order: [...orderMethod],
  });

  return callback(null, {
    ...pageMachine(count, pageNo, limit, rows.length),
    persons: rows,
  });
};

const checkArmyNoExist = async (req, callback) => {
  const { armyNo } = req.query;

  const checkArmyNo = await db.pers.findOne({ where: { armyNo } });

  return callback(null, checkArmyNo);
};
const exportGetAllPerson = async (body) => {
  try {
    const headers = ["ARMY NO", "RANK", "NAME", "COY", "PL"];
    const details = [];

    for (const obj of body) {
      details.push({
        armyNo: obj.armyNo ? obj.armyNo : "",
        rank: obj.rank ? obj.rank : "",
        name: obj.name ? obj.name : "",
        coy: obj.coy ? obj.coy : "",
        pl: obj.pl ? obj.pl : "",
      });
    }
    return generatePDF("exportListAllPerson.hbs", { headers, details });
  } catch (err) {
    console.log(err);
  }
};

export default { addPerson, getPersonById, deletePersonById, editPersonById, getAllPerson, checkArmyNoExist, exportGetAllPerson };
