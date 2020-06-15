
const state = {
    pageTitle: ''

}

const mutations = {
    setPreferences (state, payload) {
        state.preferences = payload
    },
   
    setPageTitle (state, payload) {
        state.pageTitle = payload
    },
 
    
}

const getters = {

    

}

const actions = {
   
    setPageTitle ({commit}, payload) {
        commit('setPageTitle', payload)
    },
   
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}