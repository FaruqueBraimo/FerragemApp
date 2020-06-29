import Vue from 'vue';
import { dbSales } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	sales: {},
	uploadProgress: 0,
	loading: false,
	SalesearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addSale(state, payload) {
		Vue.set(state.sales, payload.id, payload.object);
	},

	editSale(state, payload) {
		Object.assign(state.sales[payload.id], payload.updates);
	},
	deleteSale(state, id) {
		Vue.delete(state.sales, id);
	}
};

const getters = {};

const actions = {
	listenSaleRealTimeChanges({ commit }) {
		commit('resetSale');

		dbSales
			.orderBy('createdAt', 'desc')
			.limit(10)
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addSale', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('editSale', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteSale', change.doc.id);
					}
				});
			});
	},

	addSale({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date();
		payload.updatedAt = new Date();
		commit('loading', true);

		return dbSales
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetSale');

				showSuccessMessage('Venda Efectuda!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	editSale({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt = new Date();

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbSales
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);

				showSuccessMessage(' Venda  Editada!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage(error.message);

				return false;
			});
	},

	deleteSale({ commit }, id) {
		return dbSales
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

	getSaleByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbSales
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let Sales = [];
				resp.docChanges().forEach(item => {
					let Sales = item.doc.data();
					Sales.id = item.doc.id;

					Sales.push(Sales);
				});
				commit('loading', false);

				return Sales;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setSalesearchKey({ commit, dispatch }, text) {
		commit('setSalesearchKey', text);

		commit('loading', true);
		commit('resetSale');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.Sales).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All Sales where reseted for now...'
			);
			commit('resetSale');
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
