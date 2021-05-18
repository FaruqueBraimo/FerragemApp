import Vue from 'vue';
import { dbRetiradas } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	boxs: {},
	uploadProgress: 0,
	loading: false,
	boxearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addRetirada(state, payload) {
		Vue.set(state.boxs, payload.id, payload.object);
	},

	EditRetirada(state, payload) {
		Object.assign(state.boxs[payload.id], payload.updates);
	},
	deleteRetirada(state, id) {
		Vue.delete(state.boxs, id);
	},
	
};

const getters = {
	
};

const actions = {	

	listenRetidaRealTimeChanges({ commit }) {

		dbRetiradas.
		orderBy('createdAt', 'asc').
		onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {

						commit('addRetirada', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('EditRetirada', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteRetirada', change.doc.id);
					}
				});
			});
	},

	addRetirada({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()
		commit('loading', true);

		return dbRetiradas
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações

				showSuccessMessage('Caixa aberta !');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	EditRetirada({ commit, rootGetters }, payload) {

		payload.updates.updatedAt = new Date()

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbRetiradas
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);

				showSuccessMessage(payload.message || 'Sucesso');
				
				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage(error.message);

				return false;
			});
	},

	deleteRetirada({ commit }, id) {
		return dbRetiradas
			.doc(id)
			.delete()
			.then(function(docRef) {
				showSuccessMessage('Fluxo eliminado com sucesso...');
				return true;
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);
				return false;
			});
	},

	getcategoryByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbRetiradas
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let box = [];
				resp.docChanges().forEach(item => {
					let box = item.doc.data();
					box.id = item.doc.id;

					box.push(box);
				});
				commit('loading', false);

				return box;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setboxearchKey({ commit, dispatch }, text) {
		commit('setboxearchKey', text);

		commit('loading', true);
		commit('resetcategory');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.box).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All box where reseted for now...'
			);
			commit('resetcategory');
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
