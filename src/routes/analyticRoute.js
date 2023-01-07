import express from "express";
import analyticController from "../controllers/analyticController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.get("/companySummery", auth, analyticController.companySummery);
Router.get("/paradeState", auth, analyticController.paradeState);
Router.get("/leaveSummery", auth, analyticController.leaveSummery);
Router.get("/upcomingBirthday", auth, analyticController.upcomingBirthday);
export default Router;
