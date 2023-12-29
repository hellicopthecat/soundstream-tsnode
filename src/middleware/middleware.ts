import { ExpressRouter } from "../types/type";

export const pugLocalMiddleware: ExpressRouter = (req, res, next) => {
	res.locals.loggedIn = req.session.loggedIn ?? false;
	res.locals.loggedUser = req.session.user ?? null;
	next();
};
