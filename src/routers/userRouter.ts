import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
	return res.send("3");
});
userRouter.get("/info", (req, res) => {
	return res.send("info");
});

export default userRouter;
