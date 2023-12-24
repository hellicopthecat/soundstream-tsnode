import "./db";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import musicRouter from "./routers/musicRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 5040;
const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// global middelware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Post 할때 필요 express 가 form의 데이터를 어떻게 다루는지 몰라서 이를 설정해주면 body의 정보들을 보기 좋게 형식을 갖춰준다.

//routers
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/music", musicRouter);
app.use("/user", userRouter);

const handleListen = () =>
	console.log("✅ Server is Listenin on http://localhost:5040");
app.listen(PORT, handleListen);
