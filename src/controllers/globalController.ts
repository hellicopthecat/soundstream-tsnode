import { ExpressRouter } from "../types/type";

export const home: ExpressRouter = (req, res) => {
	return res.render("home", { pageTitle: "HOME" });
};
export const upload: ExpressRouter = (req, res) => {
	return res.render("upload", { pageTitle: "UPLOAD" });
};
export const uploadPost: ExpressRouter = (req, res) => {
	const { contentRadio, contentTitle, contentDesc } = req.body;

	console.log(contentRadio);
	console.log(contentTitle);
	console.log(contentDesc);
	return res.redirect("/upload");
};
