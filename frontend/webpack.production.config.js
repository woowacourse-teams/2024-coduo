import { merge } from 'webpack-merge';
import common from './webpack.common.config.js';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
import dotenv from 'dotenv';
import webpack from 'webpack';

const env = dotenv.config({ path: '.env.production' }).parsed;

const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {})
  : {};

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: '2024-coduo',
      project: 'coduo2024',
      telemetry: false,
      sourcemaps: {
        assets: './dist/**',
        filesToDeleteAfterUpload: './dist/**/*.map',
      },
    }),
    new webpack.DefinePlugin(envKeys),
  ],
  plugins: [new webpack.DefinePlugin(envKeys)],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
});
