import Vue from 'vue';
import { dbNotifications } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	notifications: {},
	uploadProgress: 0,
	loading: false,
	NotificationsearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addNotification(state, payload) {
		Vue.set(state.notifications, payload.id, payload.object);
	},

	editNotification(state, payload) {
		Object.assign(state.notifications[payload.id], payload.updates);
	},
	deleteNotification(state, id) {
		Vue.delete(state.notifications, id);
	}
};

const getters = {};

const actions = {
	listenNotificationRealTimeChanges({ commit }) {
		commit('resetNotification');

		dbNotifications
		
			.onSnapshot(function(snapshot) {
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addNotification', {
							id: change.doc.id,
							object: change.doc.data()
						});
					}
					if (change.type === 'modified') {
						commit('editNotification', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteNotification', change.doc.id);
					}
				});
			});
	},

	addNotification({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date();
		payload.updatedAt = new Date();
		commit('loading', true);

		return dbNotifications
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações
				commit('resetNotification');


				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	editNotification({ commit, rootGetters }, payload) {
		commit('loading', true);

		payload.updates.updatedAt = new Date();

		let sucessMessage = payload.successMessage
			? payload.successMessage
			: state.defaultUpdateSuccessMessage;

		return dbNotifications
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);


				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage(error.message);

				return false;
			});
	},

	deleteNotification({ commit }, id) {
		return dbNotifications
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

	getNotificationByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbNotifications
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let Notifications = [];
				resp.docChanges().forEach(item => {
					let Notifications = item.doc.data();
					Notifications.id = item.doc.id;

					Notifications.push(Notifications);
				});
				commit('loading', false);

				return Notifications;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setNotificationsearchKey({ commit, dispatch }, text) {
		commit('setNotificationsearchKey', text);

		commit('loading', true);
		commit('resetNotification');

		if ((text && text.length > 1) || !text) {
			dispatch('getData', true);
		}
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.Notifications).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All Notifications where reseted for now...'
			);
			commit('resetNotification');
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
