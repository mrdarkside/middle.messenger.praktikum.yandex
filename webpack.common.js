const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devServer: {
    hot: true,
    port: 1234,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpg|png|svg|webp|gif|avif)$/i,
        type: 'asset/resource',
        generator: {
          filename: './img/[name][ext]',
        },
      },
    ],
  },
};
