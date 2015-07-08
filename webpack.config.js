module.exports = {
    entry: "./client.js",
    output: {
        path: __dirname+'/public/js/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude : /node_modules/, loaders:["babel-loader"] }
        ]
    }
};