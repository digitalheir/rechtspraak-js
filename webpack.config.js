const webpack = require('webpack');
const path = require('path');
const libraryName = 'rechtspraak';

/**
 * Webpack plugins, depending on commandline flags.
 * @return Array
 */
function getPlugins ({/*debug, */minify}) {
    //noinspection JSUnresolvedFunction
    const plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development')
        }),
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: minify,
            options: {
                context: __dirname,
                /*postcss: [
                    cssnext({
                        browsers: ['last 2 version', 'ie >= 11']
                    })
                ]*/
            }
        })/*,
        new ExtractTextPlugin(minify ? '[name].min.css' : '[name].css')*/
    ];

    if (minify) {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    screw_ie8: true,
                    warnings: false
                },
                output: {
                    comments: false
                }
            })
        )
    }

  /* uncomment if using mutiple entry points
   if (minify) {
   plugins.push(
   new webpack.optimize.CommonsChunkPlugin({
   name: 'vendor'
   })
   )
   }
   */
/*
    plugins.push(
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve(__dirname, 'src/index.html'),
            minify: minify ? {
                removeComments: true,
                collapseWhitespace: true
            } : false
        })
    );*/

    return plugins
}


/**
 * Generates a Webpack config.
 * @param  {Boolean} debug
 * @param  {Boolean} minify
 * @return {Object}
 */
module.exports = ({debug = false, minify = false} = {}) => ({
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: libraryName+".js",
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: getPlugins({debug, minify})
});