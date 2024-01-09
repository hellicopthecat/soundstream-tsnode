import express from "express";
import {
	registerVideoView,
	registerVideoComment,
} from "../controllers/videoController";

const apiRouter = express.Router();
apiRouter.post("/video/:id([0-9a-f]{24})/view", registerVideoView);
apiRouter.post("/video/:id([0-9a-f]{24})/comment", registerVideoComment);
export default apiRouter;
