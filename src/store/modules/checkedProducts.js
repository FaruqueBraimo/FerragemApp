import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

const state = {
	checkedProducts: ''
};

const mutations = {
	setCheckedProduct(state, payload) {
		state.checkedProducts = payload;
	}
};

const getters = {
    getCheckedProducts() {
        var data = localStorage.getItem('checkedProducts');
        return data;
    }
};

const actions = {
	addCheckedProducts({ commit }, payload) {
         let checked = []
         var data = localStorage.getItem('checkedProducts');
         data = data ? JSON.parse(data) : [];

         data.push({
            products : {'products' : payload}
         })

         localStorage.setItem('checkedProducts', JSON.stringify(data));

	
;
	
showSuccessMessage(' Adicionado na lista')
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
