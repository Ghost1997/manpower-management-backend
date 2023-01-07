import express from "express";
import promotionController from "../controllers/promotionController.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/addPromotion", auth, promotionController.addPromotion);
Router.get("/deletePromotionById", auth, promotionController.deletePromotionById);
Router.post("/editPromotionById", auth, promotionController.editPromotionById);

export default Router;
