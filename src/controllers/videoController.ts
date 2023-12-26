import contentsModel from "../models/contentsModel";
import { ExpressRouter } from "../types/type";

export const video: ExpressRouter = async (req, res) => {
	const videos = await contentsModel.find({ contentsForm: "video" });
	return res.render("./videoTemp/video", { pageTitle: "VIDEO", videos });
};
export const videoDetail: ExpressRouter = async (req, res) => {
	const { id } = req.params;
	const video = await contentsModel.findById(id);
	return res.render("./videoTemp/videoDetail", {
		pageTitle: video?.title.toUpperCase(),
		video,
	});
};
export const videoEdit: ExpressRouter = async (req, res) => {
	const { id } = req.params;
	const videoId = id.replace("/edit", "");
	const video = await contentsModel.findById(videoId);
	return res.render("./videoTemp/videoEdit", {
		pageTitle: `EDIT ${video?.title}`,
		video,
	});
};
export const videoEditSave: ExpressRouter = (req, res) => {
	const { id } = req.params;
	console.log(id);

	return res.redirect(`/video/${id}`);
};
