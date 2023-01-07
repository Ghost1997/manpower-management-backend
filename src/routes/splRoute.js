import express from "express";
import splAttribController from "../controllers/splAttribController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addSplAttrib", auth, splAttribController.addSplAttrib);
Router.get("/deleteSplAttribById", auth, splAttribController.deleteSplAttribById);
Router.post("/editSplAttribById", auth, splAttribController.editSplAttribById);

export default Router;
