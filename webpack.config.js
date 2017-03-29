const path    = require('path')
const webpack = require('webpack')

module.exports = {
    entry : './src/ref-line.js',
    output: {
        path         : path.resolve(__dirname, 'dist'),
        filename     : 'ref-line.min.js',
        library      : 'RefLine',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'}
        ]
    }
}