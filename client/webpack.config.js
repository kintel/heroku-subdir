var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    // Allowed implicit extensions for require/import
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      // This is required to force a deployment build of React:
      // https://facebook.github.io/react/downloads.html
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    }),
    new HtmlWebpackPlugin({
      inject: false, // Done by html-webpack-template
      template: 'node_modules/html-webpack-template/index.ejs',
      title: 'Heroku Subdir',
      appMountId: 'content',
      favicon: 'images/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      }
// FIXME: Do we need smth. like this?
//      window: {
//        env: {
//          apiHost: 'http://myapi.com/api/v1'
//        }
//      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel?' + JSON.stringify({
          presets: ['react', 'es2015', 'stage-3'],
          plugins: ['transform-runtime']
        })]
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?' + JSON.stringify({
          presets: ['es2015', 'stage-3'],
          plugins: ['transform-runtime']
        })]
      },

      // General purpose CSS loader, needed by e.g. react-bootstrap-table
      { test: /\.css$/, loader: 'style!css' },
      // General purpose LESS loader, needed by e.g. bootstrap and our own less stylesheets
      { test: /\.less$/, loader: 'style!css!less' },

      // The following 5 loaders are needed by bootstrap
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },

      // The following loaders are needed by auth0-lock
      { test: /node_modules\/auth0-lock\/.*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify'
        ]
      },
      { test: /node_modules\/auth0-lock\/.*\.ejs$/, loader: 'transform-loader/cacheable?ejsify' },
      { test: /\.json$/, loader: 'json-loader' },

      // Needed by our label module
      { test: /\.label$/, loader: 'raw' }

    ]
  }
};
