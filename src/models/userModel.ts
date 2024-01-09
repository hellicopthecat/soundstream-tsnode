import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/type";

const userSchema = new mongoose.Schema<IUser>({
	userId: { type: String, require: true, unique: true },
	password: { type: String, require: true },
	username: { type: String, require: true },
	email: { type: String, require: true, unique: true },
	social: { type: Boolean, default: false },
	avatarUrl: String,
	videos: [{ type: mongoose.Schema.ObjectId, required: true, ref: "Video" }],
	comments: [
		{ type: mongoose.Schema.ObjectId, required: true, ref: "Comments" },
	],
});

userSchema.pre("save", async function () {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password!, 7);
	}
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
