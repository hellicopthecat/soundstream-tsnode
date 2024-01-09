const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BASE_JS = "./src/client/scripts";
module.exports = {
	entry: {
		main: `${BASE_JS}/main.ts`,
		videoPlayer: `${BASE_JS}/videoPlayer.ts`,
		recordVideo: `${BASE_JS}/recordVideo.ts`,
		comment: `${BASE_JS}/comment.ts`,
	},
	mode: "development",
	watch: true,
	devtool: "inline-source-map",
	output: {
		filename: "js/[name].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: {
					loader: "ts-loader",
				},
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
};
