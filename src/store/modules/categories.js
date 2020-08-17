import Vue from 'vue';
import { dbcategories } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	categories: {},
	uploadProgress: 0,
	loading: false,
	categoriesearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addCategory(state, payload) {
		Vue.set(state.categories, payload.id, payload.object);
	},

	editCategory(state, payload) {
		Object.assign(state.categories[payload.id], payload.updates);
	},
	deleteCategory(state, id) {
		Vue.delete(state.categories, id);
	},
	
	
};

const getters = {
	
};

const actions = {
	

	

	listencategoryRealTimeChanges({ commit }) {
		commit('resetcategory');

		dbcategories
		
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {

						commit('addCategory', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('editCategory', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteCategory', change.doc.id);
					}
				});
			});
	},

	addCategory({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()
		commit('loading', true);

		return dbcategories
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetcategory');

				showSuccessMessage('categoria Adicionada com sucesso!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	editCategory({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt = new Date()

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbcategories
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);

					showSuccessMessage('Categoria editada com sucesso!');
				

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage(error.message);

				return false;
			});
	},

	deleteCategory({ commit }, id) {
		return dbcategories
			.doc(id)
			.delete()
			.then(function(docRef) {
				showSuccessMessage('categoria eliminada com sucesso...');
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

		return dbcategories
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let categories = [];
				resp.docChanges().forEach(item => {
					let categories = item.doc.data();
					categories.id = item.doc.id;

					categories.push(categories);
				});
				commit('loading', false);

				return categories;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setcategoriesearchKey({ commit, dispatch }, text) {
		commit('setcategoriesearchKey', text);

		commit('loading', true);
		commit('resetcategory');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.categories).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All categories where reseted for now...'
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
