import jwt from "jsonwebtoken";
import mesaage from "../common/errorMessage.js";
import fs from "fs";
import db from "../db/sqlDbConnection.js";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const publicKey = fs.readFileSync("public.key");
    const decodedToken = jwt.verify(token, publicKey);
    const userId = decodedToken.id;

    const findAdmin = await db.admin.findOne({ raw: true, where: { id: userId }, attributes: ["id", "name", "email"] });

    if (!findAdmin) {
      res.status(mesaage.UNAUTHORIZED_CODE).json({
        success: false,
        message: mesaage.UNAUTHORIZED,
        data: null,
      });
    } else {
      req.user = findAdmin;
      next();
    }
  } catch {
    res.status(mesaage.UNAUTHORIZED_CODE).json({
      success: false,
      message: mesaage.UNAUTHORIZED,
      data: null,
    });
  }
};

export default auth;
