import Vue from 'vue';
import { dbPrices } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	prices: {},
	uploadProgress: 0,
	loading: false,
	pricesearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addPrice(state, payload) {
		Vue.set(state.prices, payload.id, payload.object);
	},

	editprice(state, payload) {
		Object.assign(state.prices[payload.id], payload.updates);
	},
	deleteprice(state, id) {
		Vue.delete(state.prices, id);
	}
};

const getters = {};

const actions = {
	listenPriceRealTimeChanges({ commit }) {
		commit('resetprice');

		dbPrices
			.orderBy('createdAt', 'desc')
			.limit(10)
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addPrice', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('editPrice', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deletePrice', change.doc.id);
					}
				});
			});
	},

	addPrice({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date();
		payload.updatedAt = new Date();
		commit('loading', true);

		return dbPrices
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetprice');

				showSuccessMessage('Cotação Emitida!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	editPrice({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt = new Date();

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbPrices
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);

				showSuccessMessage(' Factura  Editada!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage(error.message);

				return false;
			});
	},

	deletePrice({ commit }, id) {
		return dbPrices
			.doc(id)
			.delete()
			.then(function(docRef) {
				showSuccessMessage(' Eliminada com sucesso...');
				return true;
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);
				return false;
			});
	},

	getPriceByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbPrices
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let prices = [];
				resp.docChanges().forEach(item => {
					let prices = item.doc.data();
					prices.id = item.doc.id;

					prices.push(prices);
				});
				commit('loading', false);

				return prices;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setpricesearchKey({ commit, dispatch }, text) {
		commit('setpricesearchKey', text);

		commit('loading', true);
		commit('resetprice');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.prices).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All prices where reseted for now...'
			);
			commit('resetprice');
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
