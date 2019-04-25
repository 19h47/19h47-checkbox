/**
 *
 * @file   webpack.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

// Node modules
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

/**
 * Resolve
 *
 * @param {str} dir Dir.
 * @return {str} Dir.
 */
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		dist: resolve('src/index.js'),
		docs: resolve('src/index.js')
	},
	devServer: {
		contentBase: resolve('dist'),
		compress: true,
		port: 9000,
		inline: true,
	},
	output: {
		library: 'Checkbox',
		libraryTarget: 'umd',
		path: resolve(''),
		filename: '[name]/main.js'
	},
	resolve: {
		alias: {
			'@': resolve('src'),

			// js
			js: resolve('src/js'),
			Blocks: resolve('src/js/blocks'),
			Common: resolve('src/js/common'),
			Pages: resolve('src/js/pages'),
			Transitions: resolve('src/js/transitions'),
			Components: resolve('src/js/components'),
			Utils: resolve('src/js/utils'),
			Services: resolve('src/js/services'),
			Factories: resolve('src/js/factories'),
			Router: resolve('src/js/router'),
			Api: resolve('src/js/api'),
			Store: resolve('src/js/store'),
			Vendors: resolve('src/js/vendors'),

			// img
			img: resolve('src/img'),
			png: resolve('src/img/png'),
			jpg: resolve('src/img/jpg'),
			svg: resolve('src/img/svg'),

			// videos
			videos: resolve('src/videos'),

			// icons
			icons: resolve('src/icons'),

			// fonts
			fonts: resolve('src/fonts'),

			// stylesheets
			stylesheets: resolve('src/stylesheets')
		}
	},
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			exclude: [/node_modules/, /vendors/],
			loader: 'eslint-loader'
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: resolve('docs/index.html'),
			template: resolve('index.html'),
			inject: false,
		}),
		new WebpackNotifierPlugin({
            title: 'Webpack',
            excludeWarnings: true,
            alwaysNotify: true
        }),
	],
};
