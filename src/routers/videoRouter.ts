import express from "express";
import {
	video,
	videoDetail,
	videoEdit,
	videoEditSave,
} from "../controllers/videoController";

const movieRouter = express.Router();

movieRouter.get("/", video);
movieRouter.get("/:id([0-9])", videoDetail);
movieRouter.route("/:id([0-9]/edit)").get(videoEdit).post(videoEditSave);

export default movieRouter;
