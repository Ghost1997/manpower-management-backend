import express from "express";
import bpetController from "../controllers/bpetController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addBpet", auth, bpetController.addBpet);
Router.get("/deleteBpetById", auth, bpetController.deleteBpetById);
Router.post("/editBpetById", auth, bpetController.editBpetById);

export default Router;
