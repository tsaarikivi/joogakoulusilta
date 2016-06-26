var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var commonLoaders = [
	{ test: /\.js$/, loader: "jsx-loader" },
	{ test: /\.png$/, loader: "url-loader" },
	{ test: /\.jpg$/, loader: "file-loader" },
];

module.exports = [
  {
  name : "joogakoulu web front-end",
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./app.jsx",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  },
  output: {
    path: __dirname + "/public/",
    filename: "app.min.js"
  },
  plugins: debug ? [
    new ExtractTextPlugin("app.min.css", {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'index.html', to: '../public/index.html'},
      { from: 'assets', to: '../public/assets'}
    ], {
    ignore: [],
    copyUnmodified: true
    })
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin("app.min.css", {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'index.html', to: '../public/index.html'},
      { from: 'assets', to: '../public/assets'}
    ], {
    ignore: [],
    copyUnmodified: true
    })
  ],
},
{
		// The configuration for the server-side component
		name: "joogakoulu payment",
    context: path.join(__dirname, "src"),
		entry: "./server.js",
		target: "node",
		output: {
			path: __dirname + "/public/",
			filename: "index.js",
			publicPath: __dirname + "/public/",
			libraryTarget: "commonjs2"
		},
		externals: /^[a-z\-0-9]+$/,
		module: {
			loaders: commonLoaders
		}
	}];
