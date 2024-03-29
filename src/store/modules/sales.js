import Vue from 'vue';
import { dbSales } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';
import products from './products';

let lastVisible = null;

const state = {
	sales: {},
	uploadProgress: 0,
	saleFiltered: {},
	saleFilteredDate: {},
	loading: false,
	mySale: {},
	SalesearchKey: ''
};

const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	resetSale(state) {
		state.sales = {};
	},
	resetSaleFiltered(state) {
		state.saleFiltered = {};
	},

	resetSaleFiltered2(state) {
		state.saleFilteredDate = {};
	},
	
	addSale(state, payload) {
		Vue.set(state.sales, payload.id, payload.object);
	},
	addMySale(state, payload) {
		Vue.set(state.mySale, payload.id, payload.object);
	}, 
	addSaleFiltered(state, payload) {
		Vue.set(state.saleFiltered, payload.id, payload.object);
	},

	addSaleFiltered2(state, payload) {
		Vue.set(state.saleFilteredDate, payload.id, payload.object);
	
	},

	editSale(state, payload) {
		Object.assign(state.sales[payload.id], payload.updates);
	},
	deleteSale(state, id) {
		Vue.delete(state.sales, id);
	}
};

const getters = {
	filterSaleByUser: (state) => (payload) => {
		let saleReturn = {};

		Object.keys(state.sales).forEach(element => {
			const sale = state.sales[element];
			 if(sale.details.salesMan == payload.user ) {
				const today = new Date();
			const yesterday = date.subtractFromDate(today, {
				hours: 24,
				milliseconds: 10000
			});
			const thisMonth = today.getMonth();
			const thisYear = today.getFullYear();
			const thisWeak = date.getWeekOfYear(today);
			const dateCreated = new Date(sale.createdAt.seconds * 1000);
			switch (payload.time) {

				case 'Todas':
					saleReturn[element] = sale;
					
					break;
			
				case 'De Hoje':
					let equality = date.isSameDate(dateCreated, today, 'day');

					if (equality) {
						saleReturn[element] = sale;
					}
					else {
						// showErrorMessage('Não houve vendas hoje.');

					}

					break;

				case 'De Ontém':
					equality = date.isSameDate(dateCreated, yesterday, 'day');

					if (equality) {
						saleReturn[element] = sale;
						console.log(saleReturn);
					}
					else {
						// showErrorMessage('Não houve vendas Ontém.');

					}
					break;
				case 'Esta Semana':
					const weekCompare = date.getWeekOfYear(dateCreated);
					if (weekCompare === thisWeak) {
						saleReturn[element] = sale;

						console.log(saleReturn);
					}
					break;
				case 'Deste Mês':
					const monthCompare = dateCreated.getMonth();
					if (monthCompare === thisMonth) {
						saleReturn[element] = sale;
						console.log(saleReturn);
					}

					break;

				case 'Deste Ano':
					const yearCompare = dateCreated.getFullYear();
					if (yearCompare === thisYear) {
						saleReturn[element] = sale;
						console.log(saleReturn);
					}

					break;

			}	
			}

			}
		);

		return saleReturn;
	},
	filterSaleByTime: (state) => (time) => {
		let saleReturn = {};
		Object.keys(state.sales).forEach(element => {
			const sale = state.sales[element];
			const today = new Date();
			const yesterday = date.subtractFromDate(today, {
				hours: 24,
				milliseconds: 10000
			});
			const thisMonth = today.getMonth();
			const thisYear = today.getFullYear();
			const thisWeak = date.getWeekOfYear(today);
			const dateCreated = new Date(sale.createdAt.seconds * 1000);
			console.log(time)
			switch (time) {

				case 'Todas':
					saleReturn[element] = sale;
					
					break;
			
				case 'De Hoje':
					let equality = date.isSameDate(dateCreated, today, 'day');

					if (equality) {
						saleReturn[element] = sale;
					}
					else {
						// showErrorMessage('Não houve vendas hoje.');

					}

					break;

				case 'De Ontém':
					equality = date.isSameDate(dateCreated, yesterday, 'day');

					if (equality) {
						saleReturn[element] = sale;
						console.log(saleReturn);
					}
					else {
						// showErrorMessage('Não houve vendas Ontém.');

					}
					break;
				case 'Esta Semana':
					const weekCompare = date.getWeekOfYear(dateCreated);
					if (weekCompare === thisWeak) {
						saleReturn[element] = sale;

						console.log(saleReturn);
					}
					break;
				case 'Deste Mês':
					const monthCompare = dateCreated.getMonth();
					if (monthCompare === thisMonth) {
						saleReturn[element] = sale;
						console.log(saleReturn);
					}

					break;

				case 'Deste Ano':
					const yearCompare = dateCreated.getFullYear();
					if (yearCompare === thisYear) {
						saleReturn[element] = sale;
						console.log(saleReturn);
					}

					break;

			}
		});

		return saleReturn;
	}
};

const actions = {
	listenSaleRealTimeChanges({ commit }) {
		dbSales
			.orderBy('createdAt', 'desc')
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

	getSaleByUserId({ commit } , x) {
		
       const userId = "xQDY27dlmaX0dColy0k7DpkzLNd2"

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

					commit('addMySale', {
						id: item.doc.id,
						object: item.doc.data()
					});

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

	setSalesearchDate({ commit, getters }, text) {
		let sales = {};

		if (text.type = 'date' ) {
			commit('resetSaleFiltered2');
			commit('resetSaleFiltered');
			sales = getters.filterSaleByTime(text.value);
			Object.keys(sales).forEach(key => {
				const sale = sales[key];
				commit('addSaleFiltered2', {
					id: key,
					object: sale
				});
			});
			
		}
	},	

	setSalesearchKey({ commit, getters }, text) {
		let sales = {};

		if (text.type = 'date' ) {
			commit('resetSaleFiltered2');
			commit('resetSaleFiltered');
			sales = getters.filterSaleByTime(text.value);
			Object.keys(sales).forEach(key => {
				const sale = sales[key];
				commit('addSaleFiltered2', {
					id: key,
					object: sale
				});
			});
			
		}

		if (text.type = 'user' ) {
			
			commit('resetSaleFiltered');
			sales = getters.filterSaleByUser(text.value);
			Object.keys(sales).forEach(key => {
				let sale = sales[key];
				commit('resetSaleFiltered2');
				commit('addSaleFiltered', {
					id: key,
					object: sale
				});

			});
			
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
