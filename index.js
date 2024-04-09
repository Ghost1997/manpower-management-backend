import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import message from "./src/common/errorMessage.js";
import env from "./config.js";
import db from "./src/db/sqlDbConnection.js";
import routes from "./src/routes/index.js";
import bodyParser from "body-parser";
import * as scheduler from "./scheduler.js";
import cors from "cors";
// For SQL Db Connection
// put { force: true } obj inside sync to Drop and re-sync db
db.sequelize.sync().then(() => {
  console.log("DB Connected");
});

// For MongoDb Connection
// import "./src/db/mongoDbConnection.js";

const app = express();
app.use(cors());
const port = env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("images"));

// handel cors error
// it should be written before any route
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST");
    return res.status(message.OK_CODE).json({});
  }
  next();
});

// Logging 400 and 500 Errors Using Morgan
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// To add security in response header
app.use(helmet());

app.use("/ping", (req, res) => {
  res.send({
    message: message.SUCCESS,
  });
});

routes(app);

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

// Middleware to handle error for unknown route
app.use((req, res, next) => {
  const error = new Error(message.NOT_FOUND);
  error.status = message.NOT_FOUND_CODE;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || message.INTERNAL_SERVER_ERROR_CODE);
  res.json({
    success: false,
    message: error.message,
    data: null,
  });
});

app.listen(port, () => console.log(`server is on running on: ${env.PROTOCOL}${env.HOST}:${port}`));
