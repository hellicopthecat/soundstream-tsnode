import express from "express";
import {
	home,
	joinAccount,
	joinPage,
	loginPage,
	postLogin,
	search,
	upload,
	uploadPost,
} from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/upload").get(upload).post(uploadPost);
globalRouter.get("/search", search);
globalRouter.route("/join").get(joinPage).post(joinAccount);
globalRouter.route("/login").get(loginPage).post(postLogin);
globalRouter.get("/logout");

export default globalRouter;
