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
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader', {
        loader: 'sass-loader',
      },
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

  config.resolve = {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  };

  return config;
};
