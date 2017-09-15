// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';

import Buefy from 'buefy';
import Vuetify from 'vuetify';

import App from './App.vue';
import router from './router';
import store from './store';

// buefy styles and icons
// import 'buefy/lib/buefy.css';
import './assets/styles/font-awesome.min.css';

// vuetify styles and icons
import 'vuetify/dist/vuetify.min.css';
import './assets/styles/material-icons.css';

import './main.scss';

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(Buefy, {
    defaultIconPack: 'fa'
});

Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
