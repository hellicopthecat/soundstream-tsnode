import express from "express";
import {
	deleteVideo,
	video,
	videoDetail,
	videoEdit,
	videoEditSave,
} from "../controllers/videoController";
import { protectMiddleWare } from "../middleware/middleware";

const movieRouter = express.Router();

movieRouter.get("/", video);
movieRouter.get("/:id([0-9a-f]{24})", videoDetail);
movieRouter
	.route("/:id([0-9a-f]{24}/edit)")
	.all(protectMiddleWare)
	.get(videoEdit)
	.post(videoEditSave);
movieRouter
	.route("/:id([0-9a-f]{24}/delete)")
	.all(protectMiddleWare)
	.get(deleteVideo);

export default movieRouter;
