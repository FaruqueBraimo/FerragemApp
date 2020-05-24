import Vue from 'vue';
import { dbProducts } from '../../boot/firebase';
import { Loading } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	products: {},
	uploadProgress: 0,
	loading: false,
	productSearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addProduct(state, payload) {
		Vue.set(state.products, payload.id, payload.object);
	},

	updateProduct(state, payload) {
		Object.assign(state.products[payload.id], payload.updates);
	},
	deleteProduct(state, id) {
		Vue.delete(state.products, id);
	},
	setProductSearchKey(state, val) {
		console.log('Searching....', val);
		state.solicitationSearchKey = val;
	},
	resetProducts(state) {
		state.products = {};
		lastVisible = null;
	}
};

const getters = {
	isInSearch: (state, getters) => products => {
		return (
			products.createdAt
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase()) ||
			products.message
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase())
		);
	},

	canGetMoreProducts: state => {
		return Object.keys(state.products).length % 10 === 0;
	}
};

const actions = {
	getData({ state, commit, getters, dispatch }, canGetMore) {
		if (getters.canGetMoreProduct) {
			let query = dbProducts.orderBy('createdAt', 'desc').limit(10);

			if (state.solicitationSearchKey) {
				query = dbProducts.orderBy('createdAt', 'desc');
			} else {
				if (canGetMore && lastVisible) {
					query = dbProducts
						.orderBy('createdAt', 'desc')
						.startAfter(lastVisible)
						.limit(10);
				}
			}

			dispatch('executeQuery', query);
		}
	},

	executeQuery({ state, commit, getters }, query) {
		commit('loading', true);

		query
			.get()
			.then(snapshot => {
				lastVisible = snapshot.docs[snapshot.docs.length - 1];

				snapshot.docChanges().forEach(function(change) {
					if (state.solicitationSearchKey) {
						if (getters.isInSearch(change.doc.data())) {
							commit('addProduct', {
								id: change.doc.id,
								object: change.doc.data()
							});
						}
					} else {
						commit('addProduct', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
				});

				commit('loading', false);
			})
			.catch(error => {
				commit('loading', false);
			});
	},

	listenProductRealTimeChanges({ commit }) {
		commit('resetProduct');

		dbProducts
			.orderBy('createdAt', 'desc')
			.limit(10)
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addProduct', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('updateProduct', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteProduct', change.doc.id);
					}
				});
			});
	},

	addProduct({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()
		commit('loading', true);

		return dbProducts
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetProduct');

				showSuccessMessage('Solicitação submetida com sucesso!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	updateProduct({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt =
			rootGetters['expDate/getTodayDateAndTimeFormated'];

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbProducts
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);

				if (payload.successMessage !== false) {
					showSuccessMessage(sucessMessage);
				}

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage(error.message);

				return false;
			});
	},

	deleteProduct({ commit }, id) {
		return dbProducts
			.doc(id)
			.delete()
			.then(function(docRef) {
				showSuccessMessage('Solicitação deletada...');
				return true;
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);
				return false;
			});
	},

	getProductByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbProducts
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let products = [];
				resp.docChanges().forEach(item => {
					let products = item.doc.data();
					products.id = item.doc.id;

					products.push(products);
				});
				commit('loading', false);

				return products;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setProductSearchKey({ commit, dispatch }, text) {
		commit('setProductSearchKey', text);

		commit('loading', true);
		commit('resetProduct');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.products).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All products where reseted for now...'
			);
			commit('resetProduct');
		}
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
