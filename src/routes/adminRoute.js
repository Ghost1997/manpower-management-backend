import express from "express";
import adminController from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/register", adminController.register);
Router.post("/login", adminController.login);
Router.get("/getAdminDetail", auth, adminController.getAdminDetail);

export default Router;
