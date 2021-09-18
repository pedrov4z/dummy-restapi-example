const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    entry: "./src/main/index.tsx",
    output: {
        path: path.join(__dirname, "public/js"),
        publicPath: "/public/js",
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", "scss"],
        alias: {
            "@": path.join(__dirname, "src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(s?)css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true,
        },
        port: 3000,
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
    plugins: [new CleanWebpackPlugin(), new Dotenv()],
};
