import express from "express";

const musicRouter = express.Router();

musicRouter.get("/", (req, res) => {
	return res.send("2");
});

export default musicRouter;
