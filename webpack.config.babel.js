// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/src/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });
// const LAUNCH_COMMAND = process.env.npm_lifecycle_event
//
// const isProduction = LAUNCH_COMMAND === 'production'
// process.env.BABEL_ENV = LAUNCH_COMMAND
//
// const productionPlugin = new webpack.DefinePlugin({
//   'process.env': {
//     NODE_ENV: JSON.stringify('production')
//   }
// });
//
// const path = require('path');
//
// const PATHS = {
//   app: path.join(__dirname, 'src'),
//   build: path.join(__dirname, 'dist')
// };
//
// const base = {
//   entry: [
//     PATHS.app
//   ],
//
//   output: {
//     path: PATHS.build,
//     filename: 'bundle.js'
//   },
//
//   module: {
//     loaders: [
//       {
//         test: /(\.jsx|\.js)$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       },
//       {
//         test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'
//       }
//     ]
//   },
//   //lets us import without ../
//   resolve: {
//     root: path.resolve('./src')
//   }
// };
//
// const developmentConfig = {
//   devtool: 'cheap-module-inline-source-map',
//   devServer: {
//     contentBase: PATHS.build,
//     hot: true,
//     inline: true,
//     progress: true
//   },
//   plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
// };
//
// const productionConfig = {
//   devtool: 'cheap-module-inline-source-map',
//   plugins: [HtmlWebpackPluginConfig, productionPlugin]
// };
//
// module.exports = Object.assign({}, base,
//   isProduction === true ? productionConfig : developmentConfig
// );

import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
}

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body'
})

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const base = {
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'}
    ]
  },
  resolve: {
    root: path.resolve('./src')
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HTMLWebpackPluginConfig, productionPlugin]
}

export default Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)