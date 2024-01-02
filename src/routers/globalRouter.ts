import express from "express";
import {
	home,
	joinAccount,
	joinPage,
	loginPage,
	logout,
	postLogin,
	search,
	upload,
	uploadPost,
} from "../controllers/globalController";
import {
	protectMiddleWare,
	publicOnlyMiddleWare,
	videoMulter,
} from "../middleware/middleware";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter
	.route("/upload")
	.get(upload)
	.post(videoMulter.single("contentUpload"), uploadPost);
globalRouter.get("/search", search);
globalRouter
	.route("/join")
	.all(publicOnlyMiddleWare)
	.get(joinPage)
	.post(joinAccount);
globalRouter
	.route("/login")
	.all(publicOnlyMiddleWare)
	.get(loginPage)
	.post(postLogin);
globalRouter.get("/logout", protectMiddleWare, logout);

export default globalRouter;
