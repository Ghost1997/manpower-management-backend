import express from "express";
import courseController from "../controllers/courseController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addCourse", auth, courseController.addCourse);
Router.get("/deleteCourseById", auth, courseController.deleteCourseById);
Router.post("/editCourseById", auth, courseController.editCourseById);
Router.post("/getAllCourse", auth, courseController.getAllCourse);
Router.post("/addCourseInList", auth, courseController.addCourseInList);
Router.get("/listAllCourseInList", auth, courseController.listAllCourseInList);

export default Router;
