import express from "express";
import {
	joinWithGithub,
	joinWithGithubFin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/join", joinWithGithub);
userRouter.get("/github/joinfin", joinWithGithubFin);

export default userRouter;
