import express from "express";
import {
	getChangePw,
	getEditUser,
	getMyPage,
	joinWithGithub,
	joinWithGithubFin,
	postChangePw,
	postEditUser,
} from "../controllers/userController";
import {
	publicOnlyMiddleWare,
	protectMiddleWare,
	avatarMulter,
} from "../middleware/middleware";

const userRouter = express.Router();

userRouter.get("/github/join", publicOnlyMiddleWare, joinWithGithub);
userRouter.get("/github/joinfin", publicOnlyMiddleWare, joinWithGithubFin);
userRouter.get("/:id([a-f0-9]{24})", getMyPage);
userRouter
	.route("/mypage/edit")
	.all(protectMiddleWare)
	.get(getEditUser)
	.post(avatarMulter.single("avatarUrl"), postEditUser);
userRouter
	.route("/change-password")
	.all(protectMiddleWare)
	.get(getChangePw)
	.post(postChangePw);

export default userRouter;
