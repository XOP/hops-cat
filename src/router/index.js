import Vue from 'vue';
import Router from 'vue-router';

import Auth from '@/components/auth/';

import Catalogue from '@/components/catalogue/';
import Storage from '@/components/storage/';

import AddStyle from '@/components/add-style/';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Catalogue',
            component: Catalogue
        },
        {
            path: '/add-style',
            name: 'AddStyle',
            component: AddStyle
        },
        {
            path: '/auth',
            name: 'Auth',
            component: Auth
        },
        {
            path: '/storage',
            name: 'Storage',
            component: Storage
        }
    ]
});
