import Vue from 'vue';
import { dbInvoices } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	invoices: {},
	uploadProgress: 0,
	loading: false,
	invoicesearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addInvoice(state, payload) {
		Vue.set(state.invoices, payload.id, payload.object);
	},

	editInvoice(state, payload) {
		Object.assign(state.invoices[payload.id], payload.updates);
	},
	deleteInvoice(state, id) {
		Vue.delete(state.invoices, id);
	}
};

const getters = {};

const actions = {
	listeninvoiceRealTimeChanges({ commit }) {
		commit('resetInvoice');

		dbInvoices
			
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addInvoice', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('editInvoice', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteInvoice', change.doc.id);
					}
				});
			});
	},

	addInvoice({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date();
		payload.updatedAt = new Date();
		commit('loading', true);

		return dbInvoices
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetInvoice');

				showSuccessMessage('Factura Emitida!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	editInvoice({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt = new Date();

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbInvoices
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

	deleteInvoice({ commit }, id) {
		return dbInvoices
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

	getInvoiceByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbInvoices
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let invoices = [];
				resp.docChanges().forEach(item => {
					let invoices = item.doc.data();
					invoices.id = item.doc.id;

					invoices.push(invoices);
				});
				commit('loading', false);

				return invoices;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setInvoicesearchKey({ commit, dispatch }, text) {
		commit('setInvoicesearchKey', text);

		commit('loading', true);
		commit('resetInvoice');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.invoices).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All invoices where reseted for now...'
			);
			commit('resetInvoice');
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
