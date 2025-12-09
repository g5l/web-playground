import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'web',
  entry: path.resolve(__dirname, 'client/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client'),
    publicPath: '/',
    clean: false,
  },
  devtool: 'source-map',
  module: {
    rules: [],
  },
  resolve: {
    extensions: ['.js', '.mjs', '.json'],
  },
};

