const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const __srcFilesProject = './wp-content/themes/webyou';

module.exports = {
   entry: __srcFilesProject + '/src/js/main.js',
	output: {
		path: path.resolve(__dirname, __srcFilesProject + '/dist/js/'),
		filename: 'main.js'
	},
	devtool: 'source-map',
   	module: {
		rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
			{
		    	test  : /\.scss$/,
		    	loader:  ExtractTextPlugin.extract({
		    		fallback:"style-loader",
					use:"css-loader?sourceMap!sass-loader?sourceMap",
		    	}),
			},
		],
	},
   	plugins: [
       new ExtractTextPlugin('./../css/main.css'),
       new BrowserSyncPlugin({
	    	host: 'localhost',
	    	port: 3000,
	    	files: [__srcFilesProject + '**/*.php'],
            proxy: 'localhost/webyou',
            injectChanges: false,
	    })
 	],
};
