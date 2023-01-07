import data from "./constant.js";
import db from "../db/sqlDbConnection.js";
import path from "path";
import Pdf from "html-pdf";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import * as fs from "fs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

Handlebars.registerHelper("inc", (val) => {
  return Number(val) + 1;
});

const limitMachine = (pageNo, pageLimit, MAX_PAGE_LIMIT = data.PAGE_LIMIT) => {
  let limit;
  switch (pageLimit) {
    case 0:
    case "0":
      limit = undefined;
      break;
    case undefined:
    case null:
      limit = MAX_PAGE_LIMIT;
      break;
    default:
      limit = pageLimit;
  }
  const offset = limit ? limit * pageNo : undefined;

  return { limit, offset };
};

const pageMachine = (total, pageNo, limit, currentRowsLength) => {
  const _limit = Number(limit || currentRowsLength);
  const _pageNo = Number(pageNo);
  const _lastPageNo = Math.ceil(total / limit) ? Math.ceil(total / limit) - 1 : 0;

  return {
    total: total,
    pageNo: _pageNo,
    perPage: _limit,
    lastPageNo: _lastPageNo,
    thisPageCount: currentRowsLength,
  };
};

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const getPersonIdByArmyNo = async (armyNo) => {
  return db.pers.findOne({ raw: true, where: { armyNo } });
};

const generatePDF = async (templateName, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { headers, details } = body;

      let templatePath = path.resolve(__dirname, `../templates/${templateName}`);

      readHTMLFile(templatePath, async (err, html) => {
        if (err) {
          return reject(err);
        }
        let htmlData = Handlebars.compile(html)({ headers: headers, data: details });
        let pdfData = await getPdf(htmlData);
        return resolve(pdfData);
      });
    } catch (error) {
      return reject(error);
    }
  });
};

const getPdf = (htmlData) => {
  return new Promise((resolve, reject) => {
    try {
      let options = {
        type: "pdf",
        format: "A1",
        border: {
          top: "1in",
          right: "1in",
          bottom: "1in",
          left: "1in",
        },
      };
      Pdf.create(htmlData, options).toBuffer((err, buffer) => {
        if (err) return reject(err);
        let base64data = Buffer.from(buffer, "binary").toString("base64");
        return resolve(base64data);
      });
    } catch (error) {
      return reject(error);
    }
  });
};

let readHTMLFile = (fullpath, callback) => {
  fs.readFile(fullpath, { encoding: "utf-8" }, (err, html) => {
    if (err) callback(err);
    else callback(null, html);
  });
};

export { limitMachine, pageMachine, getPersonIdByArmyNo, groupBy, generatePDF };
