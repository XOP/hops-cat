import Vue from 'vue';
import Router from 'vue-router';

import Hello from '@/components/Hello';
import Catalogue from '@/components/catalogue/Catalogue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/hops',
            name: 'Catalogue',
            component: Catalogue
        }
    ]
});
