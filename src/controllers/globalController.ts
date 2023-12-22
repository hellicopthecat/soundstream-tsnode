import express from "express";

export const home: express.RequestHandler = (req, res) => {
	return res.send("Here is Home Page");
};
