const webpack = require('webpack');

module.exports = {
    entry:['./src/app.js'],
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
            }
        ]
    }
};
