import express from "express";
import { registerVideoView } from "../controllers/videoController";

const apiRouter = express.Router();
apiRouter.post("/video/:id([0-9a-f]{24})/view", registerVideoView);
export default apiRouter;
