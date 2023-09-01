const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {

  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

 return {
    entry:"/src/index.js",
    output: {
     path: path.resolve(__dirname, "public/js"),
     publicPath: '/',
    filename: "app.js"	
   },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
    ],
    mode: "development",
    devServer:{
      port:3200,
      static:path.resolve(__dirname, "public/js"),
      historyApiFallback: true,
      magicHtml: false,
      hot:true
    }
  }
};
