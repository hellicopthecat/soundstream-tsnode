import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/soundstream");

mongoose.connection.once("connected", () => console.log("✅ DB is connected"));
mongoose.connection.on("error", (error) => console.log(error));
