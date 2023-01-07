import express from "express";
import caderController from "../controllers/cadreController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addCadre", auth, caderController.addCadre);
Router.get("/deleteCadreById", auth, caderController.deleteCadreById);
Router.post("/editCadreById", auth, caderController.editCadreById);
Router.post("/getAllCadre", auth, caderController.getAllCadre);
Router.post("/addCadreInList", auth, caderController.addCadreInList);
Router.get("/listAllCadreInList", auth, caderController.listAllCadreInList);

export default Router;
