var webpack = require('webpack')
var path = require('path')
var InjectHTML = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

let app = [
  path.join(__dirname, 'src/index.js')
]

let sourceMap = 'eval'

let cssLoader = {
  test: /\.scss$/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }]
}

let vueCss = cssLoader.use

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      return module.context && /node_modules/.test(module.resource)
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new InjectHTML({
    template: './src/index.html',
    inject: 'body'
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor.js', 'manifest.js']
  })
]

if (process.env.NODE_ENV) {
  sourceMap = 'source-map'
  cssLoader.use = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: './dist'
  })

  vueCss = ExtractTextPlugin.extract({
    use: [{
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    }, {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }],
    fallback: 'vue-style-loader'
  })

  plugins.push(
    new ExtractTextPlugin('assets/css/styles.css')

  )
}

let config = {
  entry: {
    app
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      path.resolve(__dirname, '/src'),
      'node_modules'
    ]
  },
  devtool: sourceMap,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: vueCss
          }
        }
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/

      },
      cssLoader,
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?limit=10000&name=images/[name].[ext]'
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }

    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true
  },
  plugins

}

module.exports = config
