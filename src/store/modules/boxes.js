import Vue from 'vue';
import { dbBox } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	box: {},
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
	addBox(state, payload) {
		Vue.set(state.box, payload.id, payload.object);
	},

	editBox(state, payload) {
		Object.assign(state.box[payload.id], payload.updates);
	},
	deleteBox(state, id) {
		Vue.delete(state.box, id);
	},
	
	
};

const getters = {
	
};

const actions = {
	

	

	listenBoxRealTimeChanges({ commit }) {
		commit('resetbox');

		dbBox
			.orderBy('createdAt', 'desc')
			.limit(10)
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {

						commit('addcategory', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('editBox', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteBox', change.doc.id);
					}
				});
			});
	},

	addcategory({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()
		commit('loading', true);

		return dbBox
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetcategory');

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

	editBox({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt = new Date()

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbBox
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);

					showSuccessMessage('Valor editado !');
				

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage(error.message);

				return false;
			});
	},

	deleteBox({ commit }, id) {
		return dbBox
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

		return dbBox
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
