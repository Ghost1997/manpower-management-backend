import express from "express";
import pptController from "../controllers/pptController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addPpt", auth, pptController.addPpt);
Router.get("/deletePptById", auth, pptController.deletePptById);
Router.post("/editPptById", auth, pptController.editPptById);

export default Router;
