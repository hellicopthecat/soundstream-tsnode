import mongoose, { Model } from "mongoose";
import { IContents } from "../types/type";
interface IHashformat extends Model<IContents> {
	formatHash(hashTags: string): string[];
}
const contentsSchema = new mongoose.Schema<IContents, IHashformat>({
	contentsForm: { type: String, required: true, trim: true },
	fileUrl: { type: String, required: true },
	title: { type: String, required: true, trim: true, minLength: 3 },
	description: { type: String, required: true, trim: true, maxLength: 30 },
	createAt: { type: Date, required: true, default: Date.now() },
	hashTags: [{ type: String, trim: true }],
	meta: {
		views: { type: Number, required: true, default: 0 },
		rating: { type: Number, required: true, default: 0 },
	},
	owner: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
});

// contentsSchema.pre("save", async function () {
// 	this.hashTags =
// 		this.hashTags &&
// 		(this.hashTags[0] as string).split(",").map((word) => `#${word}`);
// });
contentsSchema.static(
	"formatHash",
	function formatHash(hashTags: string): string[] {
		return hashTags.split(",").map((word: string) => `#${word}`);
	},
);
const contentsModel = mongoose.model<IContents, IHashformat>(
	"Video",
	contentsSchema,
);
export default contentsModel;
