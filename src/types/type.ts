import express from "express";

export type ExpressRouter = express.RequestHandler;

export interface IVideo {
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
