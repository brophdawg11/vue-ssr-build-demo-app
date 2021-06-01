const path = require('path');

const express = require('express');
const initVueRenderer = require('vue-ssr-build/src/renderer');


const isProd = process.env.NODE_ENV === 'production';
const isLocal = process.env.NODE_ENV === 'local';
const isDev = !isProd && !isLocal;

const app = express();

// Serve static files from our dist folder
app.use('/dist/', express.static(path.resolve(__dirname, '../dist'), {
    // Fall through to the in-memory filesystem only during HMR
    fallthrough: isLocal,
    index: false,
    maxAge: 15 * 60 * 1000,
}));

function errorHandler(err, res, cb) {
    res.status(500).send(`<h2>500 | Internal Server Error</h2><pre>${err}</pre>`);
    cb();
}

// Send the rest of the routes into the default Vue Renderer for SSR
const vueRenderer = initVueRenderer(app, {
    errorHandler,
    isLocal,
    isDev,
    isProd,
    hmr: isLocal,
    stream: false,
    templatePath: path.join(__dirname, './index.tpl.html'),
    clientConfig: path.join(__dirname, '../build/webpack.client.config.js'),
    serverConfig: path.join(__dirname, '../build/webpack.server.config.js'),
    clientManifest: path.join(__dirname, '../dist/vue-ssr-client-manifest.json'),
    serverBundle: path.join(__dirname, '../dist/vue-ssr-server-bundle.json'),
});

// Use a regex path here to send only general slug routes (alphanumeric and
// dashes/underscores) through to the Vue renderer, we do not want to send file
// routes (including a .) through to Vue
app.get(/^[a-z0-9-_/]*$/i, vueRenderer);

// Handle all errors from middlewares
// See: https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    if (res.headersSent) {
        next(err);
    } else {
        errorHandler(err, res, () => {});
    }
});

const server = app.listen(8000, () => {
    console.info(`Server listening at http://localhost:${server.address().port}/`);
});
