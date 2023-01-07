import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

dotenv.config({
  path: path.resolve(__dirname, `.env`),
});

const configData = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  PROTOCOL: process.env.PROTOCOL || "http://",
  MONGO_URI: process.env.MONGO_URI,
  SQL_HOST: process.env.SQL_HOST,
  SQL_PORT: process.env.SQL_PORT,
  SQL_DIALECT: process.env.SQL_DIALECT,
  SQL_USER: process.env.SQL_USER,
  SQL_PASSOWRD: process.env.SQL_PASSOWRD,
  SQL_DATABASE: process.env.SQL_DATABASE,
};

export default configData;
