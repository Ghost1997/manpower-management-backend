import express from "express";
import ereController from "../controllers/ereController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addEre", auth, ereController.addEre);
Router.get("/deleteEreById", auth, ereController.deleteEreById);
Router.post("/editEreById", auth, ereController.editEreById);
Router.post("/addEreInList", auth, ereController.addEreInList);
Router.get("/listAllEreInList", auth, ereController.listAllEreInList);
Router.post("/getAllEre", auth, ereController.getAllEre);

export default Router;
