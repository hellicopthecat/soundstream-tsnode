import express from "express";
import { home, upload, uploadPost } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/upload").get(upload).post(uploadPost);

export default globalRouter;
