module.exports = {
  entry: {
    index: './index.js'
  },
  output: {
    filename: "bundle.js",
    path: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  }
}
