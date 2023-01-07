import express from "express";
import weaponController from "../controllers/weaponController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addWeapon", auth, weaponController.addWeapon);
Router.get("/deleteWeaponById", auth, weaponController.deleteWeaponById);
Router.post("/editWeaponById", auth, weaponController.editWeaponById);

export default Router;
