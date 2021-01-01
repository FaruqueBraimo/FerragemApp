import Vue from 'vue';
import { dbProducts } from '../../boot/firebase';
import { Loading, date } from 'quasar';
import { showErrorMessage } from '../../functions/handle-error-messages';
import { showSuccessMessage } from '../../functions/show-success-messages';

let lastVisible = null;

const state = {
	products: {},
	uploadProgress: 0,
	loading: false,
	productSearchKey: '',
	productFiltered : {},
	productFilteredCategory : {},
	notifications : {},
	exportedProducts : {}
	
	}



const mutations = {
	loading(state, val) {
		state.loading = val;
	},

	uploadProgress(state, val) {
		state.uploadProgress = val;
	},
	addProduct(state, payload) {
		Vue.set(state.products, payload.id, payload.object);
		Vue.set(state.notifications, payload.id, payload.object);

	},


	addProductForExport
	(state, payload){
		payload.object.newQtd = 1;
		payload.object.subtotal = 1*payload.object.price_buy;
		
		Vue.set(state.exportedProducts, payload.id, payload.object);

	},

	updateQtdProduct(state, payload) {
		console.log(this.text)
		 
		Object.assign(state.exportedProducts[payload.id], payload.updates);



	},

	updateProduct(state, payload) {
		Object.assign(state.products[payload.id], payload.updates);
	},
	deleteProduct(state, id) {
		Vue.delete(state.products, id);
	},
	removeChecked(state, id) {
		Vue.delete(state.exportedProducts, id);
	},
	setProductSearchKey(state, val) {
		state.productSearchKey = val;
	},
	addProductSearch(state, payload) {
		// Vue.set(state.products, payload.id, payload.object);
		Vue.set(state.productFiltered, payload.id, payload.object);
	},
	addProductByCategory(state, payload) {
		// Vue.set(state.products, payload.id, payload.object);
		Vue.set(state.productFilteredCategory, payload.id, payload.object);
	},
	resetProducts(state) {
		state.products = {};
	},
	productFiltered(state) {
		state.productFiltered = {};
	},
	productFilteredCategory(state) {
		state.productFilteredCategory = {};
	}

};

const getters = {
	isInSearch: (state, getters) => products => {
		return (
			products.createdAt
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase()) ||
			products.message
				.toLowerCase()
				.includes(state.solicitationSearchKey.toLowerCase())
		);


	},
	
	getProductData:(state) => {
				return state.products || state.productFilteredCategory ;
	},

	searchProduct: (state) => (products) => {
        let object = {}
        Object.keys(products).forEach(key => {
            let product = products[key]
            if (product.name.toLowerCase().includes(state.productSearchKey.toLowerCase())) {
				object[key] = product
            }
		})
		
        return object
},
	

	canGetMoreProducts: state => {
		return Object.keys(state.products).length % 10 === 0;
	}
};

const actions = {

	
	getData({ state, commit, getters, dispatch }) {
		commit('loading', true);

		let query = dbProducts
		.orderBy('createdAt', 'asc')
			.startAfter(lastVisible)
			.limit(5)
			.get()
			.then(resp => {
				lastVisible = resp.docs[resp.docs.length - 1];
				commit('loading', false);

				resp.docChanges().forEach(function(change) {

					if (change.type === 'added') {
						commit('addProduct', {
							id: change.doc.id,
							object: change.doc.data()
						});

					}
					if (change.type === 'modified') {
						commit('updateProduct', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteProduct', change.doc.id);
					}
				});
			});
	},

	filterByReference({ state, commit, dispatch },myQuery) {
		let query = null
		 query = dbProducts.where("code", "==", myQuery)
				
		commit('resetProducts');
		commit('productFiltered');

		query.onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {
				console.log(change.doc.data());
				commit('resetProducts');

				if (change.type === 'added') {
					commit('addProduct', {
						id: change.doc.id,
						object: change.doc.data()
					});
				}
				if (change.type === 'modified') {
					commit('updateProduct', {
						id: change.doc.id,
						updates: change.doc.data()
					});
				}
				if (change.type === 'removed') {
					commit('deleteProduct', change.doc.id);
				}
			});
		});			
	

	},
	
	addProductForExport({ state, commit, dispatch },myQuery) {
		let query = null
		 query = dbProducts.where("name", "==", myQuery.trim() )
		
		 
		query.onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {
				console.log(change.doc.data())

				if (change.type === 'added') {
					commit('addProductForExport', {
						id: change.doc.id,
						 object: change.doc.data()
					});
				
				}
				
			
			});
		});			
	

	},




	filterCategoryDatafromDb({ state, commit, dispatch },myQuery) {
		let query = null
		
		if(myQuery=='Todas') {
			commit('resetProducts');

			 dbProducts
			 .orderBy('createdAt','asc')
			 .onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {
				console.log(change.doc.data());

				if (change.type === 'added') {
					commit('addProduct', {
						id: change.doc.id,
						object: change.doc.data()
					});
				}
				if (change.type === 'modified') {
					commit('updateProduct', {
						id: change.doc.id,
						updates: change.doc.data()
					});
				}
				if (change.type === 'removed') {
					commit('deleteProduct', change.doc.id);
				}
			});
		});	
		}
		else{
		 query = dbProducts.where("category.value", "==", myQuery.value)
		}
			
		commit('resetProducts');
		commit('productFiltered');
		commit('productFilteredCategory');



		query.onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {
				console.log(change.doc.data());

				if (change.type === 'added') {
					commit('addProduct', {
						id: change.doc.id,
						object: change.doc.data()
					});
				}
				if (change.type === 'modified') {
					commit('updateProduct', {
						id: change.doc.id,
						updates: change.doc.data()
					});
				}
				if (change.type === 'removed') {
					commit('deleteProduct', change.doc.id);
				}
			});
		});			
	
	},

	filterDatafromDb({ state, commit, getters },myQuery) {
		
		// let products =	getters.getProductData;
		// Object.keys(products).forEach(key => {
        //     let product = products[key]
        //     if (product.name.toLowerCase().includes(myQuery.toLowerCase())) {
		// 		commit('resetProducts');
		// 		commit('productFilteredCategory');				
		// 		commit('addProductSearch', {
		// 			id : key,
		// 			object : product
		// 		 } );

		// 	}
		// 	else {
		// 		console.log('No')
		// 	}
			

		// })

		let query = null
		 query = dbProducts.where("name", "==", myQuery)
				
		 		
		commit('resetProducts');
		commit('productFiltered');
		
		query.onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {
				
				if (change.type === 'added') {
										
				if (change.type === 'added') {
					commit('addProduct', {
						id: change.doc.id,
						object: change.doc.data()
					});
				}
				}
				if (change.type === 'modified') {
					commit('updateProduct', {
						id: change.doc.id,
						updates: change.doc.data()
					});
				}
				if (change.type === 'removed') {
					commit('deleteProduct', change.doc.id);
				}
			});
		});			
	
	
		
	},

	getAllProducts({ commit }) {
		commit('resetProducts');
		commit('productFiltered');
		commit('productFilteredCategory');

		dbProducts
			.orderBy('createdAt', 'asc')
			.onSnapshot(function(snapshot) {
				lastVisible = snapshot.docs[snapshot.docs.length - 1];
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addProduct', {
							id: change.doc.id,
							object: change.doc.data()

						});

						// commit('addProductSearch', { 	id: change.doc.id,
						// 	object: change.doc.data()} );
					}
					if (change.type === 'modified') {
						commit('updateProduct', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteProduct', change.doc.id);
					}
				});
			});
	},





	
	listenProductRealTimeChanges({ commit }) {
		commit('resetProducts');
		commit('productFiltered');
		commit('productFilteredCategory');

		dbProducts
			.orderBy('createdAt', 'asc')
			.limit(2)
			.onSnapshot(function(snapshot) {
				lastVisible = snapshot.docs[snapshot.docs.length - 1];
				snapshot.docChanges().forEach(function(change) {
					if (change.type === 'added') {
						commit('addProduct', {
							id: change.doc.id,
							object: change.doc.data()

						});

						// commit('addProductSearch', { 	id: change.doc.id,
						// 	object: change.doc.data()} );
					}
					if (change.type === 'modified') {
						commit('updateProduct', {
							id: change.doc.id,
							updates: change.doc.data()
						});
					}
					if (change.type === 'removed') {
						commit('deleteProduct', change.doc.id);
					}
				});
			});
	},

	addProduct({ commit, dispatch, rootGetters }, payload) {
		payload.createdAt = new Date()
		payload.updatedAt = new Date()
		commit('loading', true);

		return dbProducts
			.add(payload)
			.then(docRef => {
				commit('loading', false);

				// 1. Limpar todas solicitações

				showSuccessMessage('Producto Adicionado com sucesso!');

				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});
	},

	updateProduct({ commit, rootGetters }, payload) {
		commit('loading', true);
		payload.updates.updatedAt = new Date()

		return dbProducts
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);
					showSuccessMessage('Producto Editado');
			
				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

				showErrorMessage('Erro');

				return false;
			});
	},

	updateQtdProduct({ commit, rootGetters }, payload) {
		console.log(payload)
		commit('updateQtdProduct', {
			id: payload.id,
			updates: payload.updates
		});
		
	},

	deleteProduct({ commit }, id) {
		return dbProducts
			.doc(id)
			.delete()
			.then(function(docRef) {
				showSuccessMessage('Producto eliminado com sucesso...');
				return true;
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);
				return false;
			});
	},

	getProductByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbProducts
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let products = [];
				resp.docChanges().forEach(item => {
					let products = item.doc.data();
					products.id = item.doc.id;

					products.push(products);
				});
				commit('loading', false);

				return products;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setProductSearchKey({ commit, dispatch, getters }, text) {
		commit('resetProducts');
		commit('setProductSearchKey',text );

		
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
