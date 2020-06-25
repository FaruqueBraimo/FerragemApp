import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

const state = {
	checkedProducts: []
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
	},
	checkIncludes: state => id => {
		var data = localStorage.getItem('checkedProducts');
		let response = false;
		const productChecked = JSON.parse(data);
		productChecked.forEach(element => {
			if (element.payload.id === id) {
				response = true;
			}
		});
		return response;
	},

	getSubTotal: state => {
		let total = 0;
		let productChecked = state.checkedProducts
		state.checkedProducts.forEach((element, key) => {
			total = +total + ~~productChecked[key].payload.price
		});

		return total;
	}
};

const actions = {
	listenCheckedProductRealTime({ commit }) {
		let checked = [];
		let data = localStorage.getItem('checkedProducts');
		const productChecked = data ? JSON.parse(data) : [];

		commit('setCheckedProduct', productChecked);
	},

	addCheckedProducts({ dispatch }, payload) {
		let checked = [];
		var data = localStorage.getItem('checkedProducts');
		data = data ? JSON.parse(data) : [];

		data.push({
			payload
		});

		localStorage.setItem('checkedProducts', JSON.stringify(data));
		dispatch('listenCheckedProductRealTime');
		showSuccessMessage(' Adicionado na lista');
	},

	removeChecked({ dispatch }, payload) {
		let checked = [];
		var data = localStorage.getItem('checkedProducts');
		let productChecked = JSON.parse(data);
		productChecked.forEach(element => {
			if (element.payload.id == payload) {
				productChecked.splice(element, 1);
			}
		});

		localStorage.setItem('checkedProducts', JSON.stringify(productChecked));
		dispatch('listenCheckedProductRealTime');
	},

	decrementQuantity({ dispatch }, payload) {
		let checked = [];
		var data = localStorage.getItem('checkedProducts');
		let productChecked = JSON.parse(data);
		let quantityIncremented = payload.updates.qtdUnit - 1;

		if (quantityIncremented >= 1) {
			let priceIncremented =
				payload.updates.price_buy * quantityIncremented;
			payload.updates.price = priceIncremented;

			payload.updates.qtdUnit = quantityIncremented;
		}
		let products = payload.updates;
		products.test = 'llll';

		productChecked.forEach((element, key) => {
			if (element.payload.id == payload.id) {
				productChecked[key] = { payload: products };
			}
		});

		localStorage.setItem('checkedProducts', JSON.stringify(productChecked));
		dispatch('listenCheckedProductRealTime');
	},

	incrementQuantity({ dispatch }, payload) {
		let checked = [];
		var data = localStorage.getItem('checkedProducts');
		let productChecked = JSON.parse(data);
		let quantityIncremented = payload.updates.qtdUnit + 1;
		let priceIncremented = payload.updates.price_buy * quantityIncremented;
		(payload.updates.price = priceIncremented),
			(payload.updates.qtdUnit = quantityIncremented);
		let products = payload.updates;
		products.test = 'llll';

		productChecked.forEach((element, key) => {
			if (element.payload.id == payload.id) {
				productChecked[key] = { payload: products };
			}
		});

		localStorage.setItem('checkedProducts', JSON.stringify(productChecked));
		dispatch('listenCheckedProductRealTime');
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
