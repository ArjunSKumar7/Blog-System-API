import { body } from "express-validator";

export const validateSignup = [
body("name").notEmpty().withMessage("Name is required"),
body("email").isEmail().withMessage("Valid email is required"),
body("password")
.isLength({ min: 6 })
.withMessage("Password must be at least 6 characters"),
body("mobile")
.isMobilePhone()
.withMessage("Valid mobile number is required"),
];

export const validateLogin = [
body("email").isEmail().withMessage("Valid email is required"),
body("password").notEmpty().withMessage("Password is required"),
];

