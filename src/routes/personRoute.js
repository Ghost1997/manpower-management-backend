import express from "express";
import personController from "../controllers/personController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/fileUpload.js";
const Router = express.Router();

Router.post("/addPerson", auth, upload.single("image"), personController.addPerson);
Router.get("/getPersonById", auth, personController.getPersonById);
Router.get("/deletePersonById", auth, personController.deletePersonById);
Router.post("/editPersonById", auth, upload.single("image"), personController.editPersonById);
Router.post("/getAllPerson", auth, personController.getAllPerson);
Router.get("/checkArmyNoExist", auth, personController.checkArmyNoExist);
Router.post("/exportGetAllPerson", auth, personController.exportGetAllPerson);

export default Router;
