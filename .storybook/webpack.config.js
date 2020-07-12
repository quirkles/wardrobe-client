const path = require('path')
console.log('########') //eslint-disable-line
console.log(path.dirname(path.resolve(__dirname))) //eslint-disable-line

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.dirname(path.resolve(__dirname)),
      '~': path.dirname(path.resolve(__dirname))
    }
  }
}
