import mongoose from "mongoose";
import { IVideo } from "../types/type";

const contentsSchema = new mongoose.Schema<IVideo>({
	contentsForm: { type: String, required: true, trim: true },
	title: { type: String, required: true, trim: true },
	description: { type: String, required: true, trim: true },
	createAt: { type: Date, required: true, default: Date.now() },
	hashTags: [{ type: String, trim: true }],
	meta: {
		views: { type: Number, required: true, default: 0 },
		rating: { type: Number, required: true, default: 0 },
	},
});

const contentsModel = mongoose.model("Video", contentsSchema);
export default contentsModel;
