const state = {
    isAuthenticated: false
};

const mutations = {
    signIn (state) {
        state.isAuthenticated = true;
    },

    signOut (state) {
        state.isAuthenticated = false;
    }
};

const actions = {
    signIn ({ commit }) {
        commit('signIn');
    },

    signOut ({ commit }) {
        commit('signOut');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
