import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import musicRouter from "./routers/musicRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 5040;
const app = express();
// global middelware
app.use(morgan("dev"));

//routers
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/music", musicRouter);
app.use("/user", userRouter);

const handleListen = () =>
	console.log("✅ Server is Listenin on http://localhost:5040");
app.listen(PORT, handleListen);
