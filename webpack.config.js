module.exports = {
    entry: "./commition.js",
    output: {
        path: __dirname+'/public/js/',
        filename: "cs.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude : /node_modules/, loaders:["babel-loader"] }
        ]
    }
};