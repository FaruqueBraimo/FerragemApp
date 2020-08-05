import Vue from 'vue';
import { dbStockExits } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';


const state = {
	stockExits: {},
	uploadProgress: 0,
	loading: false,
	StockEntriesearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addStockExit(state, payload) {
		Vue.set(state.stockExits, payload.id, payload.object);
	},

	editStockExit(state, payload) {
		Object.assign(state.stockExits[payload.id], payload.updates);
	},
	deleteStockExit(state, id) {
		Vue.delete(state.stockExits, id);
	},
	
	
};

const getters = {
	
};

const actions = {
	

	

	listenStockExitRealTimeChanges({ commit }) {
		commit('resetStockEntry');

		dbStockExits
			.orderBy('createdAt', 'desc')
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {

						commit('addStockExit', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('editStockExit', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteStockExit', change.doc.id);
					}
				});
			});
	},

	addStockExit({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()
		commit('loading', true);

		return dbStockExits
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetStockEntry');

				showSuccessMessage('Produto subtraido !');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	editStockExit({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt = new Date()

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbStockExits
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);

					showSuccessMessage('saida editada com sucesso!');
				

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage(error.message);

				return false;
			});
	},

	deleteStockExit({ commit }, id) {
		return dbStockExits
			.doc(id)
			.delete()
			.then(function(docRef) {
				showSuccessMessage('entrada eliminada com sucesso...');
				return true;
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);
				return false;
			});
	},

	getStockEntryByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbStockExits
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let StockEntries = [];
				resp.docChanges().forEach(item => {
					let StockEntries = item.doc.data();
					StockEntries.id = item.doc.id;

					StockEntries.push(StockEntries);
				});
				commit('loading', false);

				return StockEntries;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setStockEntriesearchKey({ commit, dispatch }, text) {
		commit('setStockEntriesearchKey', text);

		commit('loading', true);
		commit('resetStockEntry');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.StockEntries).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All StockEntries where reseted for now...'
			);
			commit('resetStockEntry');
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
