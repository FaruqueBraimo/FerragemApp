//  Exported products for users

import Vue from 'vue';
import { dbExpoProducts } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	expoProducts: {},
	uploadProgress: 0,
	loading: false,
	productSearchKey: '',
	productFiltered : {},
	productFilteredCategory : {},
	notifications : {},
	idExpo : {} ,
	myProducts : {},
	productToSale: {
	},
	saleProduct : {}
	
	}

const mutations = {

	findProductForSale: (state)  => {
		
        return state.productSearchKey

	},

	addMyProduct(state, payload){
		Vue.set(state.myProducts, payload.id, payload.object);

	},

	addProductForSale
			
	(state, payload){
		Vue.set(state.saleProduct, payload.id, payload.object);

	},

	updateQtdProduct(state, payload) {
	
	Object.assign(state.productToSale[payload.id], payload.updates);
	
	},

	removeChecked(state, id) {
		Vue.delete(state.productToSale, id);
	},
	
	uploadProgress(state, val) {
		state.uploadProgress = val;
	},

	addExpoProduct(state, payload) {
		Vue.set(state.expoProducts, payload.id, payload.object);

	},

	updateExpoProduct(state, payload) {
		Object.assign(state.expoProducts[payload.id], payload.updates);
	},
	deleteExpoProduct(state, id) {
		Vue.delete(state.expoProducts, id);
	},
	productSearchKey(state, payload) {
		console.log(payload)
		
		state.productSearchKey = payload;
	},
	addExpoProductSearch(state, payload) {
		// Vue.set(state.products, payload.id, payload.object);
		Vue.set(state.productFiltered, payload.id, payload.object);
	},
	
	productToSale(state, payload) {
		payload.object.subtotal = 1*payload.object.price_buy;

		Vue.set(state.productToSale, payload.id, payload.object);
	},

	resetExpoProducts(state) {
		state.ExpoProducts = {};
	},
	expoProductFiltered(state) {
		state.productFiltered = {};
	},
	expoProductFilteredCategory(state) {
		state.productFilteredCategory = {};
	}
	
};

const getters = {
	isInSearch: (state, getters) => expoProducts => {
		return (
			expoProducts.createdAt
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase()) ||
			expoProducts.message
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase())
		);

	},
	sumTotals: (state, getters) => productToSale => {
		let totals = {
			sumMoney : 0
		};
		let sumMoney = 0;
		let sumQtd = 0;
		let product = {}
		Object.keys(productToSale).forEach(element => {
			product = productToSale[element];

			console.log(product)
			sumMoney = sumMoney + product.subtotal;
			sumQtd = sumQtd + product.quantity;

				totals.sumMoney = sumMoney 
			
		});

		return totals.sumMoney;
	},
	
	getProductData:(state) => {
				return state.expoProducts || state.productFilteredCategory ;
	},

	searchProduct: (state) => (expoProducts) => {
        let object = {}
        Object.keys(expoProducts).forEach(key => {
			let product = expoProducts[key]  	
		 
		  if (product.name.includes(state.productSearchKey.toLowerCase())) {
				if(product.quantity > 0) {
					object[key] = product

				} 
				
			}

			});
            
        return object
},
	
	canGetMoreExpoProducts: state => {
		return Object.keys(state.ExpoProducts).length % 10 === 0;
	}
};

const actions = {

	getData({ state, commit, getters, dispatch }) {
		commit('deleteExpoProduct', '')
		let query = dbExpoProducts
		.orderBy('createdAt', 'asc')
			
			.get()
			.then(resp => {
				lastVisible = resp.docs[resp.docs.length - 1];
				
				resp.docChanges().forEach(function(change) {

					if (change.type === 'added') {
						commit('addExpoProduct', {
							id: change.doc.id,
							object: change.doc.data()
						});

					}
					if (change.type === 'modified') {
						commit('updateExpoProduct', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteExpoProduct', change.doc.id);
					}
				});
			});
	},

	findProductByName({ state, commit, dispatch },myQuery) {
	
		let query = null
		 query = dbExpoProducts.where("user.value", "==", myQuery)
	
		query.onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {

				if (change.type === 'added') {
					commit('addProductForSale', {
						id: change.doc.id,
						object: change.doc.data(),
						
					});

				}
					
			});

		});			
		console.log( myQuery)

	},

	filterMyProducts({ state, commit, dispatch },myQuery) {
		
		let query = null
		query = dbExpoProducts.where("user.value", "==", myQuery)
	   let id = ''				
	   query.onSnapshot(function(snapshot) {
		   snapshot.docChanges().forEach(function(change) {
			   
			   if (change.type === 'added') {

				   commit('addMyProduct', {
					   id: change.doc.id,
					   object: change.doc.data()
				   });

			   }
				   
		   });
	   });			
	
	},

	addOrUpdateExportedProducts ({ state, commit, getters },payload) {
		return   dbExpoProducts.doc(payload.id || 'xyz' ).set(payload)
		.then(function (docRef) {
			console.log("salvo")
		})	
	},

	filterExpoProduct({ state, commit, getters },myQuery) {

		commit('cleanId')
		
		let query = null
		 query = dbExpoProducts.where("user", "==", myQuery.user).where("product", "==", myQuery.product)
		let id = ''				
		query.onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {
				
				if (change.type === 'added') {

					commit('setId', {
						key: 'keys',
						object: change.doc.id
					});

				}
					
			});
		});			
	
	},

	getAllExpoProducts({ commit }) {
		commit('resetExpoProducts');
		commit('expoProductFiltered');
		commit('expoProductFilteredCategory');

		dbExpoProducts
			.orderBy('createdAt', 'asc')
			.onSnapshot(function(snapshot) {
				lastVisible = snapshot.docs[snapshot.docs.length - 1];
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addExpoProduct', {
							id: change.doc.id,
							object: change.doc.data()

						});

						// commit('addExpoProductsearch', { 	id: change.doc.id,
						// 	object: change.doc.data()} );
					}
					if (change.type === 'modified') {
						commit('updateExpoProduct', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteExpoProduct', change.doc.id);
					}
				});
			});
	},

	listenProductRealTimeChanges({ commit }) {
		commit('resetExpoProducts');
		commit('expoProductFiltered');
		commit('expoProductFilteredCategory');

		dbExpoProducts
			.orderBy('createdAt', 'asc')
			.limit(2)
			.onSnapshot(function(snapshot) {
				lastVisible = snapshot.docs[snapshot.docs.length - 1];
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addExpoProduct', {
							id: change.doc.id,
							object: change.doc.data()

						});

						// commit('addExpoProductsearch', { 	id: change.doc.id,
						// 	object: change.doc.data()} );
					}
					if (change.type === 'modified') {
						commit('updateExpoProduct', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteExpoProduct', change.doc.id);
					}
				});
			});
	},

	addExpoProduct({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()

		return dbExpoProducts
			.add(payload)
			.then(docRef => {
				
			 showSuccessMessage( `Produtos exportados`)
			 
				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				showErrorMessage(error.message);

				return false;
			});

	},

	updateExpoProduct({ commit, rootGetters }, payload) {
		
		payload.updates.updatedAt = new Date()

		return dbExpoProducts
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
			
				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
			
				showErrorMessage('Erro');

				return false;
			});
	},

	deleteExpoProduct({ commit }, id) {
		return dbExpoProducts
			.doc(id)
			.delete()
			.then(function(docRef) {
				return true;
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
				return false;
			});
	},

	productToSale({ commit }, payload) {
		commit('productToSale', {
			id: payload.id,
			object: payload.product
		})
		
	},

	setExpoProductsearchKey({ commit }, text) {
		
		commit('productSearchKey',text );

	},

	updateQtdProduct({ commit, rootGetters }, payload) {
		
		commit('updateQtdProduct', {
			id: payload.id,
			updates: payload.updates
		});
		
	},

	removeChecked({ state, commit }, id) {
		commit('removeChecked',id );

	}

};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
