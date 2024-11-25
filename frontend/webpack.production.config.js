import { merge } from 'webpack-merge';
import common from './webpack.common.config.js';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
// import dotenv from 'dotenv';
import webpack from 'webpack';
import pkg from './package.json' with { type: 'json' };

// const env = dotenv.config({ path: '.env' }).parsed;

// console.log(env);

// const envKeys = env
//   ? Object.keys(env).reduce((prev, next) => {
//       prev[`process.env.${next}`] = JSON.stringify(env[next]);
//       return prev;
//     }, {})
//   : {};

// console.log(envKeys);

const envKeys = {
  'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
  'process.env.REACT_APP_SENTRY_AUTH_TOKEN': JSON.stringify(process.env.REACT_APP_SENTRY_AUTH_TOKEN),
  'process.env.REACT_APP_SENTRY_DSN': JSON.stringify(process.env.REACT_APP_SENTRY_DSN),
  'process.env.REACT_APP_GA_TRACKING_ID': JSON.stringify(process.env.REACT_APP_GA_TRACKING_ID),
  'process.env.REACT_APP_CLIENT_ID': JSON.stringify(process.env.REACT_APP_CLIENT_ID),
  'process.env.REACT_APP_GITHUB_AUTH': JSON.stringify(process.env.REACT_APP_GITHUB_AUTH),
  'process.env.REACT_APP_VERSION': JSON.stringify(pkg.version),
};

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin(envKeys),
    sentryWebpackPlugin({
      authToken: process.env.REACT_APP_SENTRY_AUTH_TOKEN,
      org: '2024-coduo',
      project: 'coduo2024',
      release: 'Coduo' + process.env.REACT_APP_VERSION,
      telemetry: false,
      sourcemaps: {
        assets: './dist/**',
        filesToDeleteAfterUpload: './dist/**/*.map',
      },
      include: './dist',
      ignore: ['node_modules'],
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
});
