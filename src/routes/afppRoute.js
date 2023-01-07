import express from "express";
import afppController from "../controllers/afppController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addAfpp", auth, afppController.addAfpp);
Router.get("/deleteAfppById", auth, afppController.deleteAfppById);
Router.post("/editAfppById", auth, afppController.editAfppById);
Router.get("/getAllAfppByPersId", auth, afppController.getAllAfppByPersId);

export default Router;
