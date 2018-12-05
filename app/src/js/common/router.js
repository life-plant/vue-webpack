import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import appPage from 'v-component/page/app.vue';
import indexPage from 'v-component/page/index.vue';
import gamePage from 'v-component/page/game.vue';
import resultPage from 'v-component/page/result.vue';

const routes = [
    {
        path: '/',
        component: appPage,
        children: [
            {
                path: '/',
                component: indexPage,
                name: 'indexPage',
            },
            {
                path: '/game/:id',
                component: gamePage,
                name: 'gamePage',
            },
            {
                path: '/result',
                component: resultPage,
                name: 'resultPage'
            },
        ]
    },

];

const router = new VueRouter({
    routes,
});

export default router;
