import express from "express";
import discpController from "../controllers/discpController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addDiscp", auth, discpController.addDiscp);
Router.get("/deleteDiscpById", auth, discpController.deleteDiscpById);
Router.post("/editDiscpById", auth, discpController.editDiscpById);

export default Router;
