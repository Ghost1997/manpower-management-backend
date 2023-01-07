import express from "express";
import sickReportController from "../controllers/sickReportController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addSickReport", auth, sickReportController.addSickReport);
Router.get("/deleteSickReportById", auth, sickReportController.deleteSickReportById);
Router.post("/editSickReportById", auth, sickReportController.editSickReportById);

export default Router;
