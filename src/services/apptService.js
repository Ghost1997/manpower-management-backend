import db from "../db/sqlDbConnection.js";
const addApptInList = async (req, callback) => {
  const addinList = await db.apptList.create(req.body);
  return callback(null, addinList.dataValues);
};

const listAllApptInList = async (req, callback) => {
  const apptList = await db.apptList.findAll();
  return callback(null, apptList);
};

export default { listAllApptInList, addApptInList };
