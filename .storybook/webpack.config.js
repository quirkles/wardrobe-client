const path = require('path');

module.exports = async ({ config }) => {

  function resolve(dir) {
    return path.join(__dirname, '..', dir);
  }

  /** removes existing scss rule */
  config.module.rules = config.module.rules.filter(rule =>
    !rule.test.test('.scss')
  )
  config.module.rules.push({
    test: /\.s[ca]ss$/,
    use: [
      'vue-style-loader',
      'css-loader', {
        loader: 'sass-loader',
      },
    ],
    resolve: {
      alias: {
        // figure out which one of these is needed
        '~assets': `${path.dirname(path.resolve(__dirname))}/assets`,
        'assets': `${path.dirname(path.resolve(__dirname))}/assets`
      }
    }
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

  config.resolve = {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.dirname(path.resolve(__dirname)),
      '~': path.dirname(path.resolve(__dirname))
    },
  };

  return config;
};
