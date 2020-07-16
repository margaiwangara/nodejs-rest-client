const path = require('path');
const { whenDev } = require('@craco/craco');
const ReactRefreshPlugin = require('react-refresh-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'development') {
        webpackConfig.module.rules.push({
          test: /BabelDetectComponent\.js/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [require.resolve('react-refresh/babel')],
              },
            },
          ],
        });
        webpackConfig.module.rules.push({
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  '@babel/react',
                  '@babel/typescript',
                  ['@babel/env', { modules: false }],
                ],
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-proposal-nullish-coalescing-operator',
                  'react-refresh/babel',
                ],
              },
            },
          ],
        });
      }
      return webpackConfig;
    },
    plugins: [
      ...whenDev(
        () => [new ReactRefreshPlugin({ disableRefreshCheck: false })],
        [],
      ),
    ],
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@(.*)$': '<rootDir>/src$1',
      },
    },
  },
};
