// import scss
import 'scss/app.scss';
// import js
import Vue from 'vue';
import monitor from 'mfex-core/lib/monitor';
import router from 'common/router';
import store from 'v-store/index';
import Music from 'mfex-core/lib/music/music.vue';
import popup from 'v-component/dumb/popup.vue';
import loading from 'v-component/smart/loading.vue';
import netErr from 'v-component/smart/net-err.vue';
import msg from 'v-component/dumb/msg.vue';


// Fundebug API KEY
monitor.setApikey('ab95e08d53312ccd75c74a5b303af52feb3e4065e246d6a618898826cb45733d');
monitor.handleErr4Vue(Vue);


Vue.use(Music);

Vue.component('g-popup', popup);
Vue.component('g-loading', loading);
Vue.component('g-net-err', netErr);
Vue.component('g-msg', msg);

new Vue({
    router,
    store,
}).$mount('#app');
