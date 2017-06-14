const state = {
    isAuthenticated: false,
    user: {}
};

const mutations = {
    signIn (state, user) {
        state.isAuthenticated = true;
        state.user = Object.assign({}, user);
    },

    signOut (state) {
        state.isAuthenticated = false;
        state.user = {};
    }
};

const actions = {
    signIn ({ commit }, user) {
        commit('signIn', user);
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
