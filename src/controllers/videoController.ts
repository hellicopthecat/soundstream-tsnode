import { ExpressRouter, IContentsModel } from "../types/type";

const videos: IContentsModel[] = [
	{
		id: 1,
		title: "hoho",
		desc: "fhj",
		createAt: new Date().toLocaleDateString(),
	},
	{
		id: 2,
		title: "heeh",
		desc: "werte",
		createAt: new Date().toLocaleDateString(),
	},
	{
		id: 3,
		title: "hahah",
		desc: "ryftujkty",
		createAt: new Date().toLocaleDateString(),
	},
	{
		id: 4,
		title: "asdf",
		desc: "asfdasdf",
		createAt: new Date().toLocaleDateString(),
	},
];
export const video: ExpressRouter = (req, res) => {
	return res.render("./videoTemp/video", { pageTitle: "VIDEO", videos });
};
export const videoDetail: ExpressRouter = (req, res) => {
	const { id } = req.params;
	const video = videos[+id - 1];
	return res.render("./videoTemp/videoDetail", {
		pageTitle: video.title.toUpperCase(),
		video,
	});
};
export const videoEdit: ExpressRouter = (req, res) => {
	const { id } = req.params;
	const videoId = +id.replace("/edit", "") - 1;
	const video = videos[videoId];
	return res.render("./videoTemp/videoEdit", {
		pageTitle: `EDIT ${video.title.toUpperCase()}`,
		video,
	});
};
export const videoEditSave: ExpressRouter = (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	const videoId = +id.replace("/edit", "");
	const video = videos[videoId - 1];
	video.title = title;
	return res.redirect(`/video/${videoId}`);
};
