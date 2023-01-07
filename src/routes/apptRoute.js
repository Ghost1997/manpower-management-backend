import express from "express";
import apptController from "../controllers/apptController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addApptInList", auth, apptController.addApptInList);
Router.get("/listAllApptInList", auth, apptController.listAllApptInList);

export default Router;
