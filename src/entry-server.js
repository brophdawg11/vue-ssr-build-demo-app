import initializeServer from 'vue-ssr-build/src/entry-server';

import createApp from './create-app';

const renderApp = initializeServer(createApp);
export default context => renderApp(context);
