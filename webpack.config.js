module.exports = {
    entry: "./commition.js",

    entry: {
        indexReact: "./React/index.js",
        commitionReact: "./React/commition.js"
    },
    output: {
        path: __dirname+'/public/js/',
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude : /node_modules/, loaders:["babel-loader"] }
        ]
    }
};