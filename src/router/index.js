import Vue from 'vue';
import Router from 'vue-router';


import Catalogue from '@/components/catalogue/';
import Storage from '@/components/storage/';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Catalogue',
            component: Catalogue
        },
        {
            path: '/storage',
            name: 'Storage',
            component: Storage
        }
    ]
});
