import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import musicRouter from "./routers/musicRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import MongoStore from "connect-mongo";
import { pugLocalMiddleware } from "./middleware/middleware";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// global middelware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "hoho",
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: "mongodb://127.0.0.1:27017/soundstream",
		}),
	}),
);
app.use(pugLocalMiddleware);
//routers
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/music", musicRouter);
app.use("/user", userRouter);

export default app;
