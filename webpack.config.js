const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const production = process.env.NODE_ENV === 'production' || false

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'cookie-util.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'CookieUtil',
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimize: production,
    minimizer: [
      new UglifyJSPlugin({
        parallel: true, // 多线程并行压缩，默认是系统的最大进程数 - 1
        uglifyOptions: {
          ie8: false,
          output: {
            beautify: false,
            comments: (node, { value, type }) => {
              return value.startWith('!')
            }
          }
        }
      })
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin()
  ]

}
