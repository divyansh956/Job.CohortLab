import express from "express";
import { register } from "../controllers/userController.js";

const userRouter = express.Router();

// Define the POST route for "/register" and associate it with the register controller
userRouter.post("/register", register);

export default userRouter;
