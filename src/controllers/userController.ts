import userModel from "../models/userModel";
import { ExpressRouter, IGithubUserEmail } from "../types/type";
import fetch from "node-fetch";
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
