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
	const video = await contentsModel.findById(id).populate("owner");
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
	if (video.owner?._id + "" !== req.session.user?._id + "") {
		return res.status(403).redirect("/");
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
export const registerVideoView: ExpressRouter = async (req, res) => {
	const { id } = req.params;
	const contents = await contentsModel.findById(id);
	if (!contents) {
		return res.status(404);
	}
	contents.meta.views = contents.meta.views + 1;
	await contents.save();
	return res.status(200);
};
