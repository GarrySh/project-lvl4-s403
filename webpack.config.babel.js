import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const isDevelopment = process.env.NODE_ENV === 'development';

export default () => ({
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: [path.resolve(__dirname, 'src', 'index.js')],
  },
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devtool: isDevelopment && 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: { plugins: () => [precss, autoprefixer] },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
});
