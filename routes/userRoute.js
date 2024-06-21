import express from "express";
import {
  getAllUser,
  loginUser,
  registerUser,
  removeUsers,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUser);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.delete("/remove/:id", removeUsers);

export default userRouter;
