const state = {
    itemsCount: 5
};

const getters = {
    isCatEmpty (state) {
        return state.itemsCount === 0;
    }
};

const mutations = {
    addItem (state) {
        state.itemsCount++;
    },

    removeItem (state) {
        state.itemsCount--;
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
