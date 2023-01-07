import schedule from "node-schedule";
import db from "./src/db/sqlDbConnection.js";
import moment from "moment";
const rule = new schedule.RecurrenceRule();

rule.hour = 0;
rule.minute = 0;
rule.tz = "Asia/Kolkata";

// cron to update posted status to no when ERE Started
const job = schedule.scheduleJob(rule, async () => {
  const getAllEres = await db.ere.findAll({ raw: true });
  const today = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");

  console.log(`Schedular Started For: ${new Date()}`);

  for (const data of getAllEres) {
    if (data.fromDate && data.toDate) {
      if (today >= data.fromDate && today <= data.toDate) {
        const [result] = await db.pers.update({ posted: "NO" }, { where: { id: data.persId, posted: { [db.Op.ne]: "NO" } } });
        if (result) console.log(`posted status updated for person Id: ${data.persId}`);
      }
    }
  }

  console.log(`Schedular Fisher For: ${new Date()}`);
});
