const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:{
    app: "/src/index.tsx"
  },
  output: {
   path: path.resolve(__dirname, "mvc/views"),
  //  path: path.resolve(__dirname, "public/js"),
   filename: '[name].js',
   publicPath: '/'	
 },
 resolve: {
  extensions: ['.ts', '.tsx', '.js']
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

      {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: '/node_modules/'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      // filename: path.resolve(__dirname, "public/js/../../mvc/views/index.html"),
      inject:'body',
      // publicPath: path.resolve(__dirname,'public/js/'),
      // publicPath: './js/',
      showErrors:true,
      templateContent:`
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
        <main>
          <div class="container" id="root">
          </div>
        </main>
      </body>
      </html>
      `,
    }),
  ],
  mode: "development",
  // watch:true,
  devServer:{
    port:3200,
    static:path.resolve(__dirname, "mvc/views"),
    // static:path.resolve(__dirname, "public/js"),
    historyApiFallback: true,
    // contentBase:"./public/js",
    hot:true
  }
};
