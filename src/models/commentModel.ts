import mongoose from "mongoose";
import { IComment } from "../types/type";

const commentSchema = new mongoose.Schema<IComment>({
	text: { type: String, required: true },
	owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
	contents: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Video",
	},
	createAt: { type: Date, required: true, default: Date.now() },
});

const commentModel = mongoose.model("Comments", commentSchema);

export default commentModel;
