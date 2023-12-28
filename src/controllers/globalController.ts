import { ExpressRouter } from "../types/type";
import contentsModel from "../models/contentsModel";
import userModel from "../models/userModel";
export const home: ExpressRouter = (req, res) => {
	return res.render("home", { pageTitle: "HOME" });
};
export const upload: ExpressRouter = (req, res) => {
	return res.render("upload", { pageTitle: "UPLOAD" });
};
export const uploadPost: ExpressRouter = async (req, res) => {
	const { contentRadio, title, description, hashTags } = req.body;
	try {
		if (contentRadio === "video") {
			await contentsModel.create({
				contentsForm: contentRadio,
				title,
				description,
				hashTags: contentsModel.formatHash(hashTags),
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
export const search: ExpressRouter = async (req, res) => {
	const { searchRadio, searchTxt } = req.query;
	let results: void[] = [];
	if (searchRadio === "all") {
		results = await contentsModel.find({
			title: { $regex: new RegExp(searchTxt + "", "i") },
		});
	}
	return res.render("search", { pageTitle: "SEARCH", results });
};

export const joinPage: ExpressRouter = async (req, res) => {
	return res.render("join", { pageTitle: "JOIN" });
};

export const joinAccount: ExpressRouter = async (req, res) => {
	const { userId, password, passwordCheck, username, email } = req.body;
	const userNameExists = await userModel.exists({ userId });
	const emailExists = await userModel.exists({ email });
	if (password !== passwordCheck) {
		return res.render("join", {
			pageTitle: "JOIN",
			pwError: "비밀번호가 일치하지 않습니다..",
		});
	}
	if (userNameExists) {
		return res.render("join", {
			pageTitle: "JOIN",
			idError: "아이디가 이미 사용중입니다.",
		});
	}
	if (emailExists) {
		return res.render("join", {
			pageTitle: "JOIN",
			emailError: "이메일이 이미 사용중입니다.",
		});
	}
	await userModel.create({
		userId,
		username,
		email,
		password,
	});
	return res.redirect("/login");
};
export const loginPage: ExpressRouter = async (req, res) => {
	return res.render("login", { pageTitle: "LOG IN" });
};
export const postLogin: ExpressRouter = async (req, res) => {
	return res.redirect("/");
};
