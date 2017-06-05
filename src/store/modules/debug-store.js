import localStore from 'store2';

const state = {
    isDebugMode: localStore('isDebugMode')
};

const mutations = {
    enableDebugMode (state) {
        state.isDebugMode = true;
    },

    disableDebugMode (state) {
        state.isDebugMode = false;
    }
};

const actions = {
    enableDebugMode ({ commit }) {
        commit('enableDebugMode');

        localStore('isDebugMode', true);
    },

    disableDebugMode ({ commit }) {
        commit('disableDebugMode');

        localStore('isDebugMode', false);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
