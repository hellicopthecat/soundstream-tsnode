import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL as string);

mongoose.connection.once("connected", () => console.log("✅ DB is connected"));
mongoose.connection.on("error", (error) => console.log(error));
