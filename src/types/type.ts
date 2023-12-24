import express from "express";

export type ExpressRouter = express.RequestHandler;

export interface IContentsModel {
	id: number;
	title: string;
	desc: string;
	tags?: string;
	createAt: string | number;
}
