import contentsModel from "../models/contentsModel";
import { ExpressRouter } from "../types/type";

export const video: ExpressRouter = async (req, res) => {
	const videos = await contentsModel
		.find({ contentsForm: "video" })
		.sort({ createAt: "desc" });
	return res.render("./videoTemp/video", { pageTitle: "VIDEO", videos });
};
export const videoDetail: ExpressRouter = async (req, res) => {
	const { id } = req.params;
	const video = await contentsModel.findById(id);
	if (!video) {
		return res.status(404).render("404", {
			pageTitle: `Not Found`,
		});
	}
	return res.render("./videoTemp/videoDetail", {
		pageTitle: video?.title.toUpperCase(),
		video,
	});
};
export const videoEdit: ExpressRouter = async (req, res) => {
	const { id } = req.params;
	const videoId = id.replace("/edit", "");
	const video = await contentsModel.findById(videoId);
	if (!video) {
		return res.status(404).render("404", {
			pageTitle: `Not Found`,
		});
	}
	return res.render("./videoTemp/videoEdit", {
		pageTitle: `EDIT ${video?.title}`,
		video,
	});
};
export const videoEditSave: ExpressRouter = async (req, res) => {
	const { id } = req.params;
	const { title, description, hashTags } = req.body;
	const videoId = id.replace("/edit", "");
	const video = await contentsModel.exists({ _id: videoId });

	if (!video) {
		return res.status(404).render("404", {
			pageTitle: `Not Found`,
		});
	}
	await contentsModel.findByIdAndUpdate(videoId, {
		title,
		description,
		hashTags: hashTags.split(",").map((word: string) => `#${word}`),
	});

	return res.redirect(`/video`);
};
export const deleteVideo: ExpressRouter = async (req, res) => {
	const { id } = req.params;
	const videoId = id.replace("/delete", "");
	const video = await contentsModel.exists({ _id: videoId });
	if (video) {
		await contentsModel.findByIdAndDelete(videoId);
		res.redirect("/video");
	} else {
		return res.status(404).render("404", {
			pageTitle: `Not Found`,
		});
	}
};
