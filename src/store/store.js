import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    itemsCount: 5,
    fitScreen: false
};

const getters = {
    isCatEmpty: state => {
        return state.itemsCount === 0;
    }
};

const mutations = {
    addItem (state) {
        state.itemsCount++;
    },

    removeItem (state) {
        state.itemsCount--;
    },

    enableFitScreen (state) {
        state.fitScreen = true;
    },

    disableFitScreen (state) {
        state.fitScreen = false;
    }
};

const actions = {
    addItem ({ commit }) {
        commit('addItem');
    },

    removeItem ({ commit, state }) {
        if (state.itemsCount > 0) {
            commit('removeItem');
        }
    },

    addItemAsync ({ commit }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                commit('addItem');
                resolve();
            }, 500);
        });
    },

    enableFitScreen ({ commit }) {
        commit('enableFitScreen');
    },

    disableFitScreen ({ commit }) {
        commit('disableFitScreen');
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
