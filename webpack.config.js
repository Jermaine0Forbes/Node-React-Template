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
    //  publicPath: 'mvc/views',
    //  publicPath: path.resolve(__dirname, "mvc/views"),
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
      // new HtmlWebpackPlugin({
      //   title: 'Development',
      //   // filename: path.resolve(__dirname, "public/js/../../mvc/views/index.html"),
      //   inject:'body',
      //   // publicPath: path.resolve(__dirname,'public/js/'),
      //   // publicPath: './js/',
      //   showErrors:true,
      //   templateContent:`
      //   <html lang="en">
      //   <head>
      //       <meta charset="UTF-8">
      //       <meta http-equiv="X-UA-Compatible" content="IE=edge">
      //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
      //       <title>Document</title>
      //   </head>
      //   <body>
      //     <main>
      //       <div class="container" id="root">
      //       </div>
      //     </main>
      //   </body>
      //   </html>
      //   `,
      // }),
      new webpack.DefinePlugin(envKeys),
    ],
    mode: "development",
    // watch:true,
    devServer:{
      port:3200,
      // static:path.resolve(__dirname, "public/js"),
      static:path.resolve(__dirname, "public/js"),
      historyApiFallback: true,
      // historyApiFallback:{
      //   index:path.resolve(__dirname, "mvc/views"),
      // },      
      // historyApiFallback:{
      //   rewrites:[
      //     { from: /./, to: path.resolve(__dirname, "public/js")}
      //   ],
      // },
      magicHtml: false,
      // contentBase:"./public/js",
      hot:true
    }
  }
} ;
