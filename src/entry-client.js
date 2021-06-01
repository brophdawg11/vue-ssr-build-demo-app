import 'regenerator-runtime/runtime';
import initializeClient from 'vue-ssr-build/src/entry-client';

import createApp from './create-app';

initializeClient(createApp, {
    // eslint-disable-next-line no-underscore-dangle
    initialState: window.__initialState,
});
