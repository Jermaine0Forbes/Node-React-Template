const path = require("path");
module.exports = {
  entry:{
    app: "/src/index.tsx"
  },
  output: {
   path: path.resolve(__dirname, "public/js"),
   filename: '[name].js'	
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
  mode: "development",
  watch:true,
  devServer:{
    port:3002,
    // contentBase:"./public/js",
    hot:true
  }
};
