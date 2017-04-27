// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import Buefy from 'buefy';

import App from './App';
import router from './router';
import store from './store';

import 'buefy/lib/buefy.css';
import './assets/styles/font-awesome.min.css';

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(Buefy, {
    defaultIconPack: 'fa'
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
