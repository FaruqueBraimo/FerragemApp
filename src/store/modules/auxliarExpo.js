//  Exported products for users


import Vue from 'vue';
import { dbAuxliarExpoProducts } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	auxliarExpoProducts: {},
	uploadProgress: 0,
	loading: false,
	productSearchKey: '',
	productFiltered : {},
	productFilteredCategory : {},
	notifications : {},
	idExpo : {} ,
	myProducts : {},
	productToSale: {},
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


	addAuxiliarExpoProduct(state, payload) {
		Vue.set(state.auxliarExpoProducts, payload.id, payload.object);

	},

	updateExpoProduct(state, payload) {
		Object.assign(state.auxliarExpoProducts[payload.id], payload.updates);
	},
	deleteExpoProduct(state, id) {
		Vue.delete(state.auxliarExpoProducts, id);
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
	
	getProductData:(state) => {
				return state.expoProducts || state.productFilteredCategory ;
	},


	searchProduct: (state) => (expoProducts) => {
        let object = {}
        Object.keys(expoProducts).forEach(key => {
			let product = expoProducts[key]  	
		 

		  if (product.name.includes(state.productSearchKey.toLowerCase())) {
				if(product.quantity >= 1) {
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
		let query = dbAuxliarExpoProducts
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
		 query = dbAuxliarExpoProducts.where("user.value", "==", myQuery).where("statusDelivery", "==", true)
	
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
		query = dbAuxliarExpoProducts.where("user.value", "==", myQuery)
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
		return   dbAuxliarExpoProducts.doc(payload.id || 'xyz' ).set(payload)
		.then(function (docRef) {
			console.log("salvo")
		})	
	},

	filterExpoProduct({ state, commit, getters },myQuery) {

		commit('cleanId')
		
		let query = null
		 query = dbAuxliarExpoProducts.where("user", "==", myQuery.user).where("product", "==", myQuery.product)
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

		dbAuxliarExpoProducts
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

		dbAuxliarExpoProducts
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

	addAuxiliarExpoProduct({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()

		return dbAuxliarExpoProducts
			.add(payload)
			.then(docRef => {
				

		 
			 
				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				showErrorMessage(error.message);

				return false;
			});


	},

	updateAuxiliarExpoProduct({ commit, rootGetters }, payload) {
		
		payload.updates.updatedAt = new Date()

		return dbAuxliarExpoProducts
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

	deleteAuxiliarExpoProduct({ commit }, id) {
		return dbAuxliarExpoProducts
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
