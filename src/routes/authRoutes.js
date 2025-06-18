import express from "express";
import authController from "../controllers/authController.js";
import { validateSignup, validateLogin } from "../validators/authValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";
const router = express.Router();

//user login and signup

router.post("/user/login", validateLogin, validateRequest, authController.userLogin);
router.post("/user/signup", validateSignup, validateRequest, authController.userSignup);





export default router;
