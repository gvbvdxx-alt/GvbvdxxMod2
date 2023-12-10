const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
var webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    mode: 'production',
    devServer: {
        port: 8375,
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        compress: false,
		disableHostCheck: true
    },
	optimization: {
			minimize: false,
			removeAvailableModules: false,
			removeEmptyChunks: false,
			splitChunks: false,
			usedExports: false,
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                minSize: 50000,
                maxInitialRequests: 5
            }
        },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'gm2player.js',
		path: path.resolve('dist')
	},
    performance: {
        hints: false,
        maxEntrypointSize: Infinity,
        maxAssetSize: Infinity
    },
	resolve: {
        symlinks: false
	},
	module: {
		//Fixes the bug where some TW extensions will not work, and fail to compile, because of Nullish coalescing operators.
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src'),
                /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                /node_modules[\\/]pify/,
                /node_modules[\\/]@vernier[\\/]godirect/
            ],
            options: {
                // Explicitly disable babelrc so we don't catch various config
                // in much lower dependencies.
                babelrc: false,
                plugins: [],
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }
		]
	},
    plugins: [
	
        new CopyWebpackPlugin({
            patterns: [{
                    info: {
                        minimized: true
                    },
                    from: 'static',
                    to: ''
                }
            ]
        })
    ],
};
