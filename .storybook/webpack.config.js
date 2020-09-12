const path = require('path');
const webpack = require('webpack');

require('dotenv').config()

module.exports = async ({ config }) => {
  config.module.rules = config.module.rules.filter(rule =>
    !rule.test.test('.scss')
  )
  config.module.rules.push( {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      'style-loader',
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  })

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ],
  });
  config.module.rules.push({
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  });

  config.resolve = {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.dirname(path.resolve(__dirname)),
      '~': path.dirname(path.resolve(__dirname)),
      '~assets': path.join(path.dirname(path.resolve(__dirname)), 'assets'),
      'assets': path.join(path.dirname(path.resolve(__dirname)), 'assets'),
    },
  };

  config.plugins.push(
    new webpack.DefinePlugin({
      AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
      AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
      AWS_IDENTITY_POOL_ID: process.env.AWS_IDENTITY_POOL_ID,
    })
  );

  return config;
};
