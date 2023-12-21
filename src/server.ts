import express, { Request, Response } from "express";
import morgan from "morgan";
const PORT = 5040;
const app = express();

const user = (req: Request, res: Response) => {
	return res.send("user Page");
};
app.use(morgan("dev"));

app.get("/", (req, res) => {
	return res.send("hi");
});
app.get("/music", (req, res) => {
	return res.send("music page");
});
app.get("/user", user);

const handleListen = () =>
	console.log("✅ Server is Listenin on http://localhost:5040");
app.listen(PORT, handleListen);
