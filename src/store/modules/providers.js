import Vue from 'vue';
import { dbProviders } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	providers: {},
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
	addProvider(state, payload) {
		Vue.set(state.providers, payload.id, payload.object);
	},

	updateProvider(state, payload) {
		Object.assign(state.providers[payload.id], payload.updates);
	},
	deleteProvider(state, id) {
		Vue.delete(state.providers, id);
	},
	setProviderSearchKey(state, val) {
		console.log('Searching....', val);
		state.solicitationSearchKey = val;
	},
	resetProviders(state) {
		state.providers = {};
		lastVisible = null;
	}
};

const getters = {
	isInSearch: (state, getters) => providers => {
		return (
			providers.createdAt
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase()) ||
			providers.message
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase())
		);
	},

	canGetMoreProviders: state => {
		return Object.keys(state.providers).length % 10 === 0;
	}
};

const actions = {
	getData({ state, commit, getters, dispatch }, canGetMore) {
		if (getters.canGetMoreProvider) {
			let query = dbProviders.orderBy('createdAt', 'desc').limit(10);

			if (state.solicitationSearchKey) {
				query = dbProviders.orderBy('createdAt', 'desc');
			} else {
				if (canGetMore && lastVisible) {
					query = dbProviders
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
							commit('addProvider', {
								id: change.doc.id,
								object: change.doc.data()
							});
						}
					} else {
						commit('addProvider', {
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

	listenProviderRealTimeChanges({ commit }) {
		commit('resetProvider');

		dbProviders
			.orderBy('createdAt', 'desc')
			
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addProvider', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('updateProvider', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteProvider', change.doc.id);
					}
				});
			});
	},

	addProvider({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()
		commit('loading', true);

		return dbProviders
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetProvider');

				showSuccessMessage('Providero Adicionado com sucesso!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	updateProvider({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt = new Date()

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbProviders
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);

				showSuccessMessage('Editado com sucesso');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage(error.message);

				return false;
			});
	},

	deleteProvider({ commit }, id) {
		return dbProviders
			.doc(id)
			.delete()
			.then(function(docRef) {
				showSuccessMessage('Providero eliminado com sucesso...');
				return true;
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);
				return false;
			});
	},

	getProviderByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbProviders
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let providers = [];
				resp.docChanges().forEach(item => {
					let providers = item.doc.data();
					providers.id = item.doc.id;

					providers.push(providers);
				});
				commit('loading', false);

				return providers;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setProviderSearchKey({ commit, dispatch }, text) {
		commit('setProviderSearchKey', text);

		commit('loading', true);
		commit('resetProvider');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.providers).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All providers where reseted for now...'
			);
			commit('resetProvider');
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
