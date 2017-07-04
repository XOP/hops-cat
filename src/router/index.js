import Vue from 'vue';
import Router from 'vue-router';

import Auth from '@/components/pages/auth/';

import Catalogue from '@/components/pages/catalogue/';
import Storage from '@/components/pages/storage/';

import AddStyle from '@/components/pages/add-style/';
import AddFlag from '@/components/pages/add-flag/';

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
            component: AddStyle,
            props: {
                fitScreen: true
            }
        },
        {
            path: '/add-flag',
            name: 'AddFlag',
            component: AddFlag,
            props: {
                fitScreen: true
            }
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
