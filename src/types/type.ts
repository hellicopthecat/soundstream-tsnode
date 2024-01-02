import express from "express";
import mongoose from "mongoose";

export type ExpressRouter = express.RequestHandler;

export interface IContents {
	contentsForm: string;
	title: string;
	description: string;
	fileUrl: string;
	createAt: Date;
	hashTags?: string[];
	meta: {
		views: number;
		rating: number;
	};
	owner?: mongoose.Types.ObjectId;
}
export interface IGithubUserEmail {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: string | null;
}

export interface IUser {
	_id?: string;
	userId?: string;
	password?: string;
	username?: string;
	email?: string;
	social?: boolean;
	avatarUrl?: string;
	videos?: mongoose.Types.ObjectId[];
}
declare module "express-session" {
	export interface SessionData {
		cookie: Cookie;
		loggedIn: boolean;
		user: IUser;
	}
}
