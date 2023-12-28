import express from "express";
import {
	deleteVideo,
	video,
	videoDetail,
	videoEdit,
	videoEditSave,
} from "../controllers/videoController";

const movieRouter = express.Router();

movieRouter.get("/", video);
movieRouter.get("/:id([0-9a-f]{24})", videoDetail);
movieRouter.route("/:id([0-9a-f]{24}/edit)").get(videoEdit).post(videoEditSave);
movieRouter.route("/:id([0-9a-f]{24}/delete)").get(deleteVideo);

export default movieRouter;
