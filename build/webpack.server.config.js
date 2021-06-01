const getServerConfig = require('vue-ssr-build/build/webpack.server.config');
const { merge } = require('webpack-merge');

// No need to run babel on server builds since Node 14+ supports the features
// we use (notably async/await)
module.exports = merge(getServerConfig({ babelLoader: false }), {
    entry: './src/entry-server.js',
});
