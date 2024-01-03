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
		secret: process.env.COOKIE_SECRET as string,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.DB_URL as string,
		}),
	}),
);
app.use(pugLocalMiddleware);

//routers
app.use("/uploads", express.static("uploads"));
app.use("/dist", express.static("dist"));
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/music", musicRouter);
app.use("/users", userRouter);

export default app;
