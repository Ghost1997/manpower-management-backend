import db from "../db/sqlDbConnection.js";
import message from "../common/errorMessage.js";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
const register = async (req, callback) => {
  try {
    // destructuring req body
    const { email, password, name } = req.body;

    // find user with email if email already exists send error response
    const findAdmin = await db.admin.findOne({ where: { email } });
    if (findAdmin) return callback({ message: "EMAIL_ALREADY_EXIST", statusCode: message.BAD_REQUEST_CODE });

    // Encrypting Password Before Saving
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // creating Admin in database
    const createAdmin = await db.admin.create({ email, name, password: encryptedPassword });

    // deleting password Key before sending response
    delete createAdmin.dataValues.password;

    return callback(null, createAdmin.dataValues);
  } catch (err) {
    console.log(err);
    return callback(err);
  }
};

const login = async (req, callback) => {
  try {
    // destructuring req body
    const { email, password } = req.body;

    // find admin with provided email if admin not found send error
    const findAdmin = await db.admin.findOne({ raw: true, where: { email } });
    if (!findAdmin) return callback({ message: "ADMIN_NOT_FOUND", statusCode: message.UNAUTHORIZED_CODE });

    // if admin found compare password with provided password
    if (!bcrypt.compareSync(password, findAdmin.password)) return callback({ message: "INCORRECT_PASSWORD", statusCode: message.UNAUTHORIZED_CODE });

    const privateKey = fs.readFileSync("private.key");

    // generate token for user and send it with response
    const token = jwt.sign({ id: findAdmin.id, email }, privateKey, { algorithm: "RS256" });
    findAdmin.token = token;

    // deleting password Key before sending response
    delete findAdmin.password;

    return callback(null, findAdmin);
  } catch (err) {
    console.log(err);
    return callback(err);
  }
};

const getAdminDetail = async (req, callback) => {
  return callback(null, req.user);
};

export default { register, login, getAdminDetail };
