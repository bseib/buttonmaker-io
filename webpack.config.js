
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: './public',
        filename: 'js/app.bundle.js',
    },

//    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "css/all.css"})
    ]
};
