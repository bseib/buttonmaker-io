
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: './public',
        filename: 'js/app.bundle.js',
    },

//    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.less$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader"),
        }, ],
    },

    plugins: [
        new ExtractTextPlugin("css/all.css")
    ]
};
