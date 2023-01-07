import express from "express";
import childrenController from "../controllers/childrenController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addChild", auth, childrenController.addChild);
Router.get("/deleteChildById", auth, childrenController.deleteChildById);
Router.post("/editChildById", auth, childrenController.editChildById);

export default Router;
