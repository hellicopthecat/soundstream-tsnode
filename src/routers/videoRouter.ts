import express from "express";
import { video } from "../controllers/videoController";

const movieRouter = express.Router();

movieRouter.get("/", (req, res) => {
	return res.send("movie");
});
movieRouter.get("/:id([0-9])", video);
export default movieRouter;
