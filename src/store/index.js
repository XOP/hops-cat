import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import HelpersStore from './modules/helpers-store';
import SimpleStore from './modules/simple-store';

export default new Vuex.Store({
    modules: {
        helpers: HelpersStore,
        simple: SimpleStore
    }
});
