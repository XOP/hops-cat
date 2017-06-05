const state = {
    isDebugMode: false
};

const mutations = {
    enableDebugMode (state) {
        state.isDebugMode = true;

        // todo: cleanup
        console.log(state.isDebugMode);
    },

    disableDebugMode (state) {
        state.isDebugMode = false;

        // todo: cleanup
        console.log(state.isDebugMode);
    }
};

const actions = {
    enableDebugMode ({ commit }) {
        commit('enableDebugMode');
    },

    disableDebugMode ({ commit }) {
        commit('disableDebugMode');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
