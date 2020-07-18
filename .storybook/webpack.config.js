const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
        resolve: {
          alias: {
            // figure out which one of these is needed
            '~assets': `${path.dirname(path.resolve(__dirname))}/assets`,
            'assets': `${path.dirname(path.resolve(__dirname))}/assets`
          }
        }
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
