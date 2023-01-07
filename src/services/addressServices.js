import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import { getPersonIdByArmyNo } from "../common/helper.js";

const addAddress = async (req, callback) => {
  const { armyNo } = req.body;

  const personInfo = await getPersonIdByArmyNo(armyNo);
  if (!personInfo) return callback({ message: "ARMY_NO_NOT_FOUND", statusCode: message.BAD_REQUEST_CODE });
  req.body.persId = personInfo.id;

  const findPersonsAddress = await db.address.findOne({ raw: true, where: { persId: personInfo.id } });
  if (findPersonsAddress) return callback({ message: "ONLY_ONE_ADDRESS", statusCode: message.BAD_REQUEST_CODE });

  const createAddress = await db.address.create(req.body);

  return callback(null, createAddress.dataValues);
};

const deleteAddressById = async (req, callback) => {
  try {
    const { id } = req.query;

    const checkAddress = await db.address.findOne({ raw: true, where: { id } });
    if (!checkAddress) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

    await db.address.destroy({ where: { id } });

    return callback(null, {});
  } catch (err) {
    console.log(err);
    return callback(err);
  }
};

const editAddressById = async (req, callback) => {
  const { id } = req.body;
  const checkAddress = await db.address.findOne({ raw: true, where: { id } });
  if (!checkAddress) return callback({ message: message.NOT_FOUND, statusCode: message.NOT_FOUND_CODE });

  let result = {};
  const updateAddress = await db.address.update(req.body, { where: { id } });
  if (updateAddress[0]) result = await db.address.findOne({ raw: true, where: { id } });

  return callback(null, result);
};

export default { addAddress, deleteAddressById, editAddressById };
