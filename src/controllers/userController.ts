import userModel from "../models/userModel";
import { ExpressRouter, IGithubUserEmail } from "../types/type";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const joinWithGithub: ExpressRouter = (req, res) => {
	const BASE_URL = "https://github.com/login/oauth/authorize";
	const config = {
		client_id: process.env.CLIENT_ID + "",
		scope: "read:user user:email",
	};
	const params = new URLSearchParams(config).toString();
	const finalUrl = `${BASE_URL}?${params}`;
	return res.redirect(finalUrl);
};
export const joinWithGithubFin: ExpressRouter = async (req, res) => {
	const BASE_URL = `https://github.com/login/oauth/access_token`;
	const config = {
		client_id: process.env.CLIENT_ID + "",
		client_secret: process.env.CLIENT_SECRET + "",
		code: req.query.code + "",
	};
	const params = new URLSearchParams(config).toString();
	const finalUrl = `${BASE_URL}?${params}`;
	const tokenRequest = await (
		await fetch(finalUrl, {
			method: "POST",
			headers: { Accept: "application/json" },
		})
	).json();

	if ("access_token" in tokenRequest) {
		const { access_token } = tokenRequest;
		const API_URL = "https://api.github.com";
		const userData = await (
			await fetch(`${API_URL}/user`, {
				headers: { Authorization: `Bearer ${access_token}` },
			})
		).json();
		const emailData = await (
			await fetch(`${API_URL}/user/emails`, {
				headers: { Authorization: `Bearer ${access_token}` },
			})
		).json();
		const userEamilObj: IGithubUserEmail = emailData.find(
			(email: IGithubUserEmail) => email.primary && email.verified,
		);
		if (!userEamilObj) {
			return res.redirect("/login");
		}
		const checkingUser = await userModel.findOne({
			email: userEamilObj.email,
			social: true,
		});
		if (checkingUser) {
			req.session.loggedIn = true;
			req.session.user = checkingUser;
			return res.redirect("/");
		} else {
			const user = await userModel.create({
				userId: userData.login,
				username: userData.name,
				email: userEamilObj.email,
				password: "",
				social: true,
				avatarUrl: userData.avatar_url,
			});
			req.session.loggedIn = true;
			req.session.user = user;
			return res.redirect("/");
		}
	} else {
		return res.redirect("/");
	}
};
export const getMyPage: ExpressRouter = async (req, res) => {
	const { id } = req.params;
	const user = await userModel.findById(id).populate("videos");
	console.log(user);
	if (!user) {
		return res.status(404).render("404", {
			pageTitle: `잘못된 접근 입니다.`,
		});
	}
	return res.render("./userTemp/userpage", {
		pageTitle: `${user?.username} 님의 페이지`,
		user,
	});
};

export const getEditUser: ExpressRouter = async (req, res) => {
	const { user } = req.session;
	return res.render("./userTemp/editProfile", {
		pageTitle: `회원정보수정하기`,
		user,
	});
};
export const postEditUser: ExpressRouter = async (req, res) => {
	const {
		session: { user },
		body: { username, avatarUrl },
		file,
	} = req;
	if (user) {
		const { _id } = user;
		const updateUser = await userModel.findByIdAndUpdate(
			_id,
			{
				avatarUrl: file?.path ?? avatarUrl,
				username,
			},
			{ new: true },
		);
		updateUser ? (req.session.user = updateUser) : null;
		return res.redirect(`/users/${_id}`);
	} else {
		return res.status(401).render("./userTemp/userpage", {
			pageTitle: `${user!.username} 님의 페이지`,
			user,
			errorMsg: "잘못된 접근입니다.",
		});
	}
};

export const getChangePw: ExpressRouter = (req, res) => {
	if (req.session.user?.social === true) {
		return res.redirect("/");
	}
	return res.render("./userTemp/changePassword", {
		pageTitle: "비밀번호 변경",
	});
};
export const postChangePw: ExpressRouter = async (req, res) => {
	const {
		body: { oldPassword, newPassword, checkPassword },
		session: { user },
	} = req;
	if (user) {
		const { _id, password } = user;
		const ok = await bcrypt.compare(oldPassword, password + "");
		if (!ok) {
			return res.status(400).render("./userTemp/changePassword", {
				pageTitle: "비밀번호 변경",
				errorMsg: "기존 비밀번호와 일치하지 않습니다.",
			});
		}
		if (newPassword !== checkPassword) {
			return res.status(400).render("./userTemp/changePassword", {
				pageTitle: "비밀번호 변경",
				errorMsg: "새 비밀번호와 2차 확인이 일치하지 않습니다.",
			});
		}
		const foundedUser = await userModel.findById(_id);
		if (foundedUser && req.session.user) {
			foundedUser.password = newPassword;
			await foundedUser.save();
			req.session.user.password = foundedUser.password;
			return res.redirect("/logout");
		}
	} else {
		return res.status(404).render("404", { pageTitle: "잘못된 접근입니다." });
	}
};
