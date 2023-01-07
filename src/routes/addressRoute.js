import express from "express";
import addressController from "../controllers/addressController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addAddress", auth, addressController.addAddress);
Router.get("/deleteAddressById", auth, addressController.deleteAddressById);
Router.post("/editAddressById", auth, addressController.editAddressById);

export default Router;
