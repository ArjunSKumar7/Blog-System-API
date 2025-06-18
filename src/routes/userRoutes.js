import express from "express";
import userController from "../controllers/userController.js";
import authCheck from "../middlewares/authCheck.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post("/posts",authCheck(),upload.single("image"),userController.createPost);
router.get("/posts",userController.getAllPosts);
router.get("/posts/:id",userController.getPost);
router.put("/posts/:id",authCheck(),upload.single("image"),userController.updatePost);
router.delete("/posts/:id", authCheck(), userController.deletePost);



export default router;
