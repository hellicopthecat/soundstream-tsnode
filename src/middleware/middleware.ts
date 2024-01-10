import { ExpressRouter } from "../types/type";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const isRenderDotCom = process.env.NODE_ENV === "production";

const s3 = new S3Client({
	region: "ap-northeast-2",
	credentials: {
		accessKeyId: process.env.AWS_ID + "",
		secretAccessKey: process.env.AWS_SECRET + "",
	},
});

const s3VideoUploader = multerS3({
	s3: s3,
	bucket: "squaresquare",
	acl: "public-read",
	key(req, file, callback) {
		callback(null, "videos/" + file.originalname);
	},
});
const s3ImageUploader = multerS3({
	s3: s3,
	bucket: "squaresquare",
	acl: "public-read",
	key(req, file, callback) {
		callback(null, "images/" + file.originalname);
	},
});

export const pugLocalMiddleware: ExpressRouter = (req, res, next) => {
	res.locals.loggedIn = req.session.loggedIn ?? false;
	res.locals.loggedUser = req.session.user;
	next();
};

export const protectMiddleWare: ExpressRouter = (req, res, next) => {
	if (req.session.loggedIn) {
		return next();
	} else {
		req.flash("error", "Not Authorized");
		return res.redirect("/login");
	}
};

export const publicOnlyMiddleWare: ExpressRouter = (req, res, next) => {
	if (!req.session.loggedIn) {
		return next();
	} else {
		req.flash("error", "Not Authorized");
		return res.redirect("/");
	}
};

export const avatarMulter = multer({
	dest: "uploads/avatar/",
	limits: {
		fieldSize: 3000000,
	},
	storage: isRenderDotCom ? s3ImageUploader : undefined,
});

export const videoMulter = multer({
	dest: "uploads/video/",
	limits: {
		fieldSize: 10000000,
	},
	storage: isRenderDotCom ? s3VideoUploader : undefined,
});
