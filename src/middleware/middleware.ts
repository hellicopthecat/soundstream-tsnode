import { ExpressRouter } from "../types/type";
import multer from "multer";

export const pugLocalMiddleware: ExpressRouter = (req, res, next) => {
	res.locals.loggedIn = req.session.loggedIn ?? false;
	res.locals.loggedUser = req.session.user;
	next();
};

export const protectMiddleWare: ExpressRouter = (req, res, next) => {
	if (req.session.loggedIn) {
		return next();
	} else {
		return res.redirect("/login");
	}
};

export const publicOnlyMiddleWare: ExpressRouter = (req, res, next) => {
	if (!req.session.loggedIn) {
		return next();
	} else {
		return res.redirect("/users/mypage");
	}
};

export const avatarMulter = multer({
	dest: "uploads/avatar/",
	limits: {
		fieldSize: 3000000,
	},
});
export const videoMulter = multer({
	dest: "uploads/video/",
	limits: {
		fieldSize: 10000000,
	},
});
