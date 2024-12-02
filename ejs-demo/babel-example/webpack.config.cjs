const path = require("node:path")

/** @type {import("webpack").Configuration} */
const config = {
    mode: "production",
    entry: {
        "main": "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.[chunkhash:8].js",
        clean: true,
    },
    optimization: {
        splitChunks: {
            minChunks: 1,
        }
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}
module.exports = config