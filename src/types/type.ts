import express from "express";

export type ExpressRouter = express.RequestHandler;

export interface IContents {
	contentsForm: string;
	title: string;
	description: string;
	createAt: Date;
	hashTags?: string[];
	meta: {
		views: number;
		rating: number;
	};
}

export interface IUser {
	userId: string;
	password: string;
	username: string;
	email: string;
}
