const state = {
    fitScreen: false
};

const mutations = {
    enableFitScreen (state) {
        state.fitScreen = true;
    },

    disableFitScreen (state) {
        state.fitScreen = false;
    }
};

const actions = {
    enableFitScreen ({ commit }) {
        commit('enableFitScreen');
    },

    disableFitScreen ({ commit }) {
        commit('disableFitScreen');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
