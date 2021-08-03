const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
  ],
}