var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/components/SVGViewboxZoom/SVGViewboxZoom.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'react': 'react',
    'react-dom': 'reactDOM'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  }
}
