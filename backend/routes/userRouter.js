import express from "express";
import { updatePassword, updateProfile, getUser, logout, login, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const userRouter = express.Router();

// Define the POST route for "/register" and associate it with the register controller

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", isAuthenticated, logout);
userRouter.get("/getuser", isAuthenticated, getUser);
userRouter.put("/update/profile", isAuthenticated, updateProfile)
userRouter.put("/update/password", isAuthenticated, updatePassword)

export default userRouter;
