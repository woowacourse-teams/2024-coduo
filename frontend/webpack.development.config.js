import { merge } from 'webpack-merge';
import common from './webpack.common.config.js';
import dotenv from 'dotenv';
import webpack from 'webpack';

const env = dotenv.config({ path: '.env.development' }).parsed;

const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {})
  : {};

export default merge(common, {
  mode: 'development',
  plugins: [new webpack.DefinePlugin(envKeys)],
  devServer: {
    client: {
      overlay: true,
      progress: true,
    },
    compress: true,
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
});
