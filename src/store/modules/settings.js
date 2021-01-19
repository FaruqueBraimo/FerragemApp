
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

    getLocalBoxStatus : state => {
        const boxStatus = localStorage.getItem('boxStatus');
		let boxStatusParsed = boxStatus ? JSON.parse(boxStatus) : [];
        return boxStatusParsed.length > 0 ? boxStatusParsed[0] : null;
        
    }

}

const actions = {
   
    setPageTitle ({commit}, payload) {
        commit('setPageTitle', payload)
    },

    addBoxStatus({ dispatch }) {
        localStorage.setItem('boxStatus',  JSON.stringify([{ dayEnd : true, data : new Date() }]));
   
},

emptyBoxStatus({ dispatch }, ) {
    // localStorage.setItem('boxStatus', []);
    console.log( 'eqa' , 'eguality')

},

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}