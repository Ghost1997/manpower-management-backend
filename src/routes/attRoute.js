import express from "express";
import attController from "../controllers/attController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addAtt", auth, attController.addAtt);
Router.get("/deleteAttById", auth, attController.deleteAttById);
Router.post("/editAttById", auth, attController.editAttById);
Router.post("/getAllAtt", auth, attController.getAllAtt);
export default Router;
