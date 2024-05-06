import db from "../db/sqlDbConnection.js";
import { groupBy } from "../common/helper.js";
import moment from "moment";

const companySummery = async (req, callback) => {
  const getCompanySummry = await db.pers.findAll({ raw: true, order: [[db.Sequelize.literal("coy='HQ', coy='SP', coy='D', coy='C', coy='B',coy='A'")]] });

  const output = groupBy(getCompanySummry, "coy");

  const result = [];

  for (const key in output) {
    if (output.hasOwnProperty(key)) {
      const groupByClass = groupBy(output[key], "class");
      const classes = [];

      for (const nkey in groupByClass) {
        if (groupByClass.hasOwnProperty(nkey)) {
          classes.push({
            class: nkey,
            classCount: groupByClass[nkey].length,
          });
        }
      }
      result.push({
        coy: key,
        companyCount: output[key].length,
        classes,
      });
    }
  }

  return callback(null, result);
};
const paradeState = async (req, callback) => {
  const today = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
  const offline = [];
  const allAvailablePerson = await db.pers.findAll({
    raw: true,
    attributes: ["id", "name", "armyNo", "coy"],
    where: { posted: "YES" },
  });

  const personOnLeave = await db.pers.findAndCountAll({
    where: { posted: "YES" },
    attributes: ["id", "name", "armyNo", "coy"],
    include: [
      {
        model: db.leave,
        attributes: ["id", "type", "fromDate", "toDate", "days", "year"],
        where: {
          [db.Op.or]: [
            { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.gte]: today } }] },
            { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.eq]: null } }] },
          ],
        },
      },
    ],
  });
  personOnLeave.rows.forEach((data) => offline.push(data.id));

  const personOnAtt = await db.pers.findAndCountAll({
    where: { posted: "YES" },
    attributes: ["id", "name", "armyNo", "coy"],
    include: [
      {
        model: db.att,
        attributes: ["id", "unit", "location", "fromDate", "toDate", "employment", "auth"],
        where: {
          [db.Op.or]: [
            { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.gte]: today } }] },
            { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.eq]: null } }] },
          ],
        },
      },
    ],
  });
  personOnAtt.rows.forEach((data) => offline.push(data.id));

  const personOnCourse = await db.pers.findAndCountAll({
    where: { posted: "YES" },
    attributes: ["id", "name", "armyNo", "coy"],
    include: [
      {
        model: db.course,
        attributes: ["id", "course", "location", "fromDate", "toDate"],
        where: {
          [db.Op.or]: [
            { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.gte]: today } }] },
            { [db.Op.and]: [{ fromDate: { [db.Op.lte]: today } }, { toDate: { [db.Op.eq]: null } }] },
          ],
        },
      },
    ],
  });
  personOnCourse.rows.forEach((data) => offline.push(data.id));

  allAvailablePerson.reduceRight(function (acc, obj, idx) {
    if (offline.indexOf(obj.id) > -1) allAvailablePerson.splice(idx, 1);
  }, 0);

  const result = {
    total: allAvailablePerson.length + personOnLeave.count + personOnAtt.count + personOnCourse.count,
    availablePerson: {
      count: allAvailablePerson.length,
      rows: allAvailablePerson,
    },
    personOnLeave,
    personOnAtt,
    personOnCourse,
  };

  return callback(null, result);
};

const leaveSummery = async (req, callback) => {
  const getLeavesByMonth = await db.leave.findAll({
    raw: true,
    attributes: [[db.sequelize.literal('EXTRACT(month FROM "from_date")'), "month"], [db.sequelize.literal('EXTRACT(year FROM "from_date")'), "year"], "id", "type", "fromDate", "toDate", "days"],
    include: [{ model: db.pers, attributes: ["armyNo", "coy", "pl", "name", "rank"] }],
  });

  const output = groupBy(getLeavesByMonth, "year");

  const result = [];

  for (const key in output) {
    if (output.hasOwnProperty(key)) {
      const groupByMonth = groupBy(output[key], "month");
      const months = [];
      for (const nkey in groupByMonth) {
        if (groupByMonth.hasOwnProperty(nkey)) {
          months.push({
            month: nkey,
            count: groupByMonth[nkey].length,
            data: groupByMonth[nkey],
          });
        }
      }
      result.push({
        year: key,
        count: output[key].length,
        months,
      });
    }
  }
  return callback(null, result);
};
const upcomingBirthday = async (req, callback) => {
  const today = moment.tz("Asia/Kolkata");
  const nextWeek = moment.tz("Asia/Kolkata").add(7, "days"); // Next 7 days

  const getUpcomingBirthday = await db.pers.findAll({
    attributes: ["armyNo", "coy", "pl", "dob", "name", "rank"],
    where: {
      dob: {
        [db.Op.and]: [
          db.Sequelize.literal(`EXTRACT('month' FROM dob) = ${today.month() + 1}`), // Month starts from 0 in moment.js
          {
            [db.Op.between]: [
              db.Sequelize.literal(`DATE_TRUNC('year', dob) + INTERVAL '${today.year()} years' + INTERVAL '1 year'`),
              db.Sequelize.literal(`DATE_TRUNC('year', dob) + INTERVAL '${today.year()} years' + INTERVAL '1 year' + INTERVAL '7 days'`),
            ],
          },
        ],
      },
    },
  });

  return callback(null, getUpcomingBirthday);
};

export default { companySummery, paradeState, leaveSummery, upcomingBirthday };
