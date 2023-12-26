import { ExpressRouter } from "../types/type";
import contentsModel from "../models/contentsModel";
export const home: ExpressRouter = (req, res) => {
	return res.render("home", { pageTitle: "HOME" });
};
export const upload: ExpressRouter = (req, res) => {
	return res.render("upload", { pageTitle: "UPLOAD" });
};
export const uploadPost: ExpressRouter = async (req, res) => {
	const { contentRadio, contentTitle, contentDesc, contentHashTags } = req.body;
	try {
		if (contentRadio === "video") {
			await contentsModel.create({
				contentsForm: contentRadio,
				title: contentTitle,
				description: contentDesc,
				hashTags:
					contentHashTags === ""
						? null
						: contentHashTags.split(",").map((tags: string) => `#${tags}`),
			});
			return res.redirect("/video");
		}
	} catch (error) {
		console.log(error);
		return res.render("upload", {
			pageTitle: "UPLOAD",
			error,
		});
	}
};
