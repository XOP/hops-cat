import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import DebugStore from './modules/debug-store';
import HelpersStore from './modules/helpers-store';
import SimpleStore from './modules/simple-store';

export default new Vuex.Store({
    modules: {
        debug: DebugStore,
        helpers: HelpersStore,
        simple: SimpleStore
    }
});
