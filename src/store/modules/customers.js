import Vue from 'vue';
import { dbCustomers } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	customers: {},
	uploadProgress: 0,
	loading: false,
	providerSearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addCustomer(state, payload) {
		Vue.set(state.customers, payload.id, payload.object);
	},

	updateCustomer(state, payload) {
		Object.assign(state.customers[payload.id], payload.updates);
	},
	deleteCustomer(state, id) {
		Vue.delete(state.customers, id);
	},
	setCustomerSearchKey(state, val) {
		console.log('Searching....', val);
		state.solicitationSearchKey = val;
	},
	resetCustomers(state) {
		state.customers = {};
		lastVisible = null;
	}
};

const getters = {
	isInSearch: (state, getters) => customers => {
		return (
			customers.createdAt
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase()) ||
			customers.message
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase())
		);
	},

	canGetMoreCustomers: state => {
		return Object.keys(state.customers).length % 10 === 0;
	}
};

const actions = {
	getData({ state, commit, getters, dispatch }, canGetMore) {
		if (getters.canGetMoreCustomer) {
			let query = dbCustomers.orderBy('createdAt', 'desc').limit(10);

			if (state.solicitationSearchKey) {
				query = dbCustomers.orderBy('createdAt', 'desc');
			} else {
				if (canGetMore && lastVisible) {
					query = dbCustomers
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
							commit('addCustomer', {
								id: change.doc.id,
								object: change.doc.data()
							});
						}
					} else {
						commit('addCustomer', {
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

	listenCustomerRealTimeChanges({ commit }) {
		commit('resetCustomer');

		dbCustomers
			.orderBy('createdAt', 'desc')
			.limit(10)
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addCustomer', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('updateCustomer', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteCustomer', change.doc.id);
					}
				});
			});
	},

	addCustomer({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()
		commit('loading', true);

		return dbCustomers
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetCustomer');

				showSuccessMessage('Customero Adicionado com sucesso!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	updateCustomer({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt = new Date()

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbCustomers
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

	deleteCustomer({ commit }, id) {
		return dbCustomers
			.doc(id)
			.delete()
			.then(function(docRef) {
				showSuccessMessage('Customero eliminado com sucesso...');
				return true;
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);
				return false;
			});
	},

	getCustomerByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbCustomers
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let customers = [];
				resp.docChanges().forEach(item => {
					let customers = item.doc.data();
					customers.id = item.doc.id;

					customers.push(customers);
				});
				commit('loading', false);

				return customers;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setCustomerSearchKey({ commit, dispatch }, text) {
		commit('setCustomerSearchKey', text);

		commit('loading', true);
		commit('resetCustomer');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.customers).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All customers where reseted for now...'
			);
			commit('resetCustomer');
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
