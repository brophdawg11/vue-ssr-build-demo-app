import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueRouter);

export default function createApp(ctx) {
    const store = new Vuex.Store({
        state: () => ({
            count: 0,
            message: 'Hello World!',
        }),
        mutations: {
            /* eslint-disable no-param-reassign */
            increment(state) {
                state.count++;
            },
            setMessage(state, message) {
                state.message = message;
            },
            /* eslint-enable no-param-reassign */
        },
    });

    if (ctx.initialState) {
        store.replaceState(ctx.initialState);
    }

    const router = new VueRouter({
        mode: 'history',
        routes: [{
            path: '/',
            alias: '/page1',
            component: () => import('./Page1.vue'),
        }, {
            path: '/page1',
            component: () => import('./Page1.vue'),
        }, {
            path: '/page2',
            component: () => import('./Page2.vue'),
        }],
    });

    const app = new Vue({
        store,
        router,
        render(h) {
            return h(App);
        },
    });

    return { app, router, store };
}
