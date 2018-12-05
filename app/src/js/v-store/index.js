/**
 * 组装模块并导出 store
 */

import Vue from 'vue';
import Vuex from 'vuex';
import siteConfig from 'site-config';

// modules
import common from 'v-store/module/common';
import game from 'v-store/module/game';
import result from 'v-store/module/result';

// plugins
import globalPlugin from 'v-store/plugin/global';
// import plugin1 from 'v-store/plugin/plugin1';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        common,
        game,
        result,
    },
    strict: siteConfig.DEBUG ? true : false,
    plugins: [globalPlugin],
});

export default store;
