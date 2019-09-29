const path = require('path');
const rootPath = path.resolve(__dirname, '../src')

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader',
      {
        loader: 'sass-loader',
        options: {
          data: `@import "@/scss/global.scss";`
        }
      }
    ],
    include: path.resolve(__dirname, '../'),
  });
	config.resolve.alias['@'] = rootPath;
	config.resolve.alias['~'] = rootPath;
  // Return the altered config
  return config;
};