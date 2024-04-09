import { Sequelize } from "sequelize";
import env from "../../config.js";
import admin from "../models/sequelize/admin.js";
import pers from "../models/sequelize/pers.js";
import address from "../models/sequelize/address.js";
import leave from "../models/sequelize/leave.js";
import afpp from "../models/sequelize/afpp.js";
import att from "../models/sequelize/att.js";
import bpet from "../models/sequelize/bpet.js";
import cadre from "../models/sequelize/cadre.js";
import children from "../models/sequelize/children.js";
import course from "../models/sequelize/course.js";
import discp from "../models/sequelize/discp.js";
import ere from "../models/sequelize/ere.js";
import firing from "../models/sequelize/firing.js";
import ppt from "../models/sequelize/ppt.js";
import promotion from "../models/sequelize/promotion.js";
import sickReport from "../models/sequelize/sickReport.js";
import splAttrib from "../models/sequelize/splAttrib.js";
import weapon from "../models/sequelize/weapon.js";
import ereList from "../models/sequelize/ereList.js";
import courseList from "../models/sequelize/courseList.js";
import cadreList from "../models/sequelize/cadreList.js";
import apptList from "../models/sequelize/apptList.js";
const sequelize = new Sequelize(env.SQL_DATABASE, env.SQL_USER, env.SQL_PASSOWRD, {
  host: env.SQL_HOST,
  port: env.SQL_PORT,
  dialect: env.SQL_DIALECT,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

db.admin = admin(sequelize, Sequelize);
db.pers = pers(sequelize, Sequelize);
db.address = address(sequelize, Sequelize);
db.leave = leave(sequelize, Sequelize);
db.afpp = afpp(sequelize, Sequelize);
db.att = att(sequelize, Sequelize);
db.bpet = bpet(sequelize, Sequelize);
db.cadre = cadre(sequelize, Sequelize);
db.children = children(sequelize, Sequelize);
db.course = course(sequelize, Sequelize);
db.discp = discp(sequelize, Sequelize);
db.ere = ere(sequelize, Sequelize);
db.firing = firing(sequelize, Sequelize);
db.ppt = ppt(sequelize, Sequelize);
db.promotion = promotion(sequelize, Sequelize);
db.sickReport = sickReport(sequelize, Sequelize);
db.splAttrib = splAttrib(sequelize, Sequelize);
db.weapon = weapon(sequelize, Sequelize);
db.ereList = ereList(sequelize, Sequelize);
db.cadreList = cadreList(sequelize, Sequelize);
db.courseList = courseList(sequelize, Sequelize);
db.apptList = apptList(sequelize, Sequelize);
// relation of main table address table
db.pers.hasOne(db.address, {
  foreignKey: "persId",
});

db.address.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table leave table
db.pers.hasMany(db.leave, {
  foreignKey: "persId",
});

db.leave.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table afpp table
db.pers.hasMany(db.afpp, {
  foreignKey: "persId",
});

db.afpp.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table att table
db.pers.hasMany(db.att, {
  foreignKey: "persId",
});

db.att.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table bpet table
db.pers.hasMany(db.bpet, {
  foreignKey: "persId",
});

db.bpet.belongsTo(db.pers, {
  foreignKey: "persId",
});
// relation of main table cadre able
db.pers.hasMany(db.cadre, {
  foreignKey: "persId",
});

db.cadre.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table children table
db.pers.hasMany(db.children, {
  foreignKey: "persId",
});

db.children.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table course table
db.pers.hasMany(db.course, {
  foreignKey: "persId",
});

db.course.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table discp table
db.pers.hasMany(db.discp, {
  foreignKey: "persId",
});

db.discp.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table ere table
db.pers.hasMany(db.ere, {
  foreignKey: "persId",
});

db.ere.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table firing table
db.pers.hasMany(db.firing, {
  foreignKey: "persId",
});

db.firing.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table ppt table
db.pers.hasMany(db.ppt, {
  foreignKey: "persId",
});

db.ppt.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table promotion table
db.pers.hasMany(db.promotion, {
  foreignKey: "persId",
});

db.promotion.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table sickReport table
db.pers.hasMany(db.sickReport, {
  foreignKey: "persId",
});

db.sickReport.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table splAttrib table
db.pers.hasMany(db.splAttrib, {
  foreignKey: "persId",
});

db.splAttrib.belongsTo(db.pers, {
  foreignKey: "persId",
});

// relation of main table weapon table
db.pers.hasMany(db.weapon, {
  foreignKey: "persId",
});

db.weapon.belongsTo(db.pers, {
  foreignKey: "persId",
});

export default db;
