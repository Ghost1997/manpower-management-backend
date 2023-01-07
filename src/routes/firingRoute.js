import express from "express";
import firingController from "../controllers/firingController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addFiring", auth, firingController.addFiring);
Router.get("/deleteFiringById", auth, firingController.deleteFiringById);
Router.post("/editFiringById", auth, firingController.editFiringById);

export default Router;
