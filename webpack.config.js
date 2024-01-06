const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
	entry: {
		main: "./src/client/scripts/main.ts",
		videoPlayer: "./src/client/scripts/videoPlayer.ts",
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
