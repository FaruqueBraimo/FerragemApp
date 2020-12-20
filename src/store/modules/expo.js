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

	saleProduct : {}
	
	}



const mutations = {


	setId(state, payload) {
		Vue.set(state.idExpo, payload.key, payload.object);
	

	},

	cleanId(state) {
		state.idExpo = {};

	},	

	addMyProduct(state, payload){
		Vue.set(state.myProducts, payload.id, payload.object);

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
	setExpoProductSearchKey(state, val) {
		state.productSearchKey = val;
	},
	addExpoProductSearch(state, payload) {
		// Vue.set(state.products, payload.id, payload.object);
		Vue.set(state.productFiltered, payload.id, payload.object);
	},
	addExpoProductByCategory(state, payload) {
		// Vue.set(state.products, payload.id, payload.object);
		Vue.set(state.productFilteredCategory, payload.id, payload.object);
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
            if (product.name.toLowerCase().includes(state.expoProductsearchKey.toLowerCase())) {
				object[key] = product
            }
		})
		
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
				commit('loading', false);

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
		 query = dbExpoProducts.where("product.label", "==", myQuery)
	

		query.onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {

				if (change.type === 'added') {
					commit('addExpoProduct', {
						id: change.doc.id,
						object: change.doc.data()
					});

					dispatch('checkedProduct/addCheckedProducts', 
					
					change.doc.data()
					, { root: true }
					
					)
		



				}
				
			
			});
		});			
	

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
				commit('loading', false);

				// 1. Limpar todas solicitações
				this.$q.dialog({
					title: 'Sucesso',
					message: `Foi exportado ${payload.quantity} unidades do produto ${payload.product.label} para o funcionario ${payload.user}`
				  }).onOk(() => {
					this.$router.go();
				  })

						
			 
				return true;
			}).bind(this)
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);
				showErrorMessage(error.message);

				return false;
			});


	},

	updateExpoProduct({ commit, rootGetters }, payload) {
		commit('loading', true);
		payload.updates.updatedAt = new Date()

		return dbExpoProducts
			.doc(payload.id)
			.update(payload.updates)
			.then(function(docRef) {
				commit('loading', false);
			
				return true;
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
				commit('loading', false);

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
				commit('loading', false);
				return false;
			});
	},

	getExpoProductByUserId({ commit }, userId) {
		if (!userId) {
			showErrorMessage(
				'Algumas informações das solicitações que deseja visualizar, poderão não ser visualizadas neste momento. Favor favor, tente mais tarde.'
			);
			return;
		}

		commit('loading', true);

		return dbExpoProducts
			.where('userId', '==', userId)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.get()
			.then(resp => {
				commit('loading', false);

				let ExpoProducts = [];
				resp.docChanges().forEach(item => {
					let ExpoProducts = item.doc.data();
					ExpoProducts.id = item.doc.id;

					ExpoProducts.push(ExpoProducts);
				});
				commit('loading', false);

				return ExpoProducts;
			})
			.catch(function(error) {
				console.log('Error ocured: ', error);
				commit('loading', false);
				return null;
			});
	},

	setExpoProductsearchKey({ commit, dispatch, getters }, text) {
		commit('resetExpoProducts');
		commit('setExpoProductsearchKey',text );

		
	},

	resetDataToOnly20({ state, commit }) {
		if (Object.keys(state.ExpoProducts).length > 75) {
			console.log(
				'Reset data to only20 not implemented yet. All ExpoProducts where reseted for now...'
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
