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
	notifications : {}
	
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

	updateProduct(state, payload) {
		Object.assign(state.products[payload.id], payload.updates);
	},
	deleteProduct(state, id) {
		Vue.delete(state.products, id);
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
	getData({ state, commit, getters, dispatch }, canGetMore) {
		if (getters.canGetMoreProduct) {
			let query = dbProducts.orderBy('createdAt', 'desc').limit(10);

			if (state.solicitationSearchKey) {
				query = dbProducts.orderBy('createdAt', 'desc');
			} else {
				if (canGetMore && lastVisible) {
					query = dbProducts
						.orderBy('createdAt', 'desc')
						.startAfter(lastVisible)
						.limit(10);
				}
			}

			dispatch('executeQuery', query);
		}
	},

	filterCategoryDatafromDb({ state, commit, dispatch },myQuery) {
	console.log(myQuery)
		let query = null
		if(myQuery=='Todas') {
			dispatch('listenProductRealTimeChanges')
		}
		else{
		 query = dbProducts.where("category.value", "==", myQuery.value)
				
		let query = dbProducts.where("category.value", "==", myQuery.value)
		commit('resetProducts');
		commit('productFiltered');
		commit('productFilteredCategory');



		query.onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {
				console.log(change.doc.data());
				commit('resetProducts');

				if (change.type === 'added') {
					commit('addProductByCategory', {
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
	},

	filterDatafromDb({ state, commit, getters },myQuery) {
		

	
		let products =	getters.getProductData;
		Object.keys(products).forEach(key => {
            let product = products[key]
            if (product.name.toLowerCase().includes(myQuery.toLowerCase())) {
				commit('resetProducts');
				commit('productFilteredCategory');				
				commit('addProductSearch', {
					id : key,
					object : product
				 } );

			}
			else {
				console.log('No')
			}
			

		})
	
		
	},


	
	listenProductRealTimeChanges({ commit }) {
		commit('resetProducts');
		commit('productFiltered');
		commit('productFilteredCategory');

		

		dbProducts
			.orderBy('createdAt', 'desc')
			.limit(10)
			.onSnapshot(function(snapshot) {
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

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.products).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All products where reseted for now...'
			);
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
