import { Notify, LocalStorage } from 'quasar'

const state = {
    checkedProducts: ''
}

const mutations = {
    setCheckedProduct(state, payload) {
        state.checkedProducts = payload
    },
   
 
   
}

const getters = {

    

}

const actions = {
   
    AddCheckedProducts({commit}, payload) {


        commit('setCheckedProducts', payload)
    },
   
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}