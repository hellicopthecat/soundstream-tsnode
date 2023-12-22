import { ExpressRouter } from "../types/type";

export const video: ExpressRouter = (req, res) => {
	console.log(req.params);
	return res.send("video");
};
