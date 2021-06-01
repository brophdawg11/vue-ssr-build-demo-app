const getClientConfig = require('vue-ssr-build/build/webpack.client.config');
const { merge } = require('webpack-merge');

module.exports = merge(getClientConfig(), {
    entry: {
        app: './src/entry-client.js',
    },
});
