const webpack = require('webpack');

module.exports = {
    entry:['bootstrap-loader','./src/app.js'],
    output:{
        path: __dirname + '/examples',
        filename: 'app.js'
    },

    module: {
        loaders: [
            {
                test:/\.js$/ ,
                loader:'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['react','es2015','stage-0']
                }
            },
            {
                test: /\.(eot|ttf|svg|png|gif|woff|woff2)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10240,
                    name: 'static/[hash].[ext]'
                }
            }
        ]
    }
};
