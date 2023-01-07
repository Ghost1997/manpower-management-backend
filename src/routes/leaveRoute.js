import express from "express";
import leaveController from "../controllers/leaveController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addLeave", auth, leaveController.addLeave);
Router.get("/deleteLeaveById", auth, leaveController.deleteLeaveById);
Router.post("/editLeaveById", auth, leaveController.editLeaveById);
Router.get("/getAllLeavesByPersId", auth, leaveController.getAllLeavesByPersId);
Router.post("/getAllLeaves", auth, leaveController.getAllLeave);

export default Router;
