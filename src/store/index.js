import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import product from './modules/products';
import category from './modules/categories';
import provider from './modules/providers';
import customer from './modules/customers';
import stockEntry from './modules/stockEntries';
import role from './modules/roles';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
	const Store = new Vuex.Store({
		modules: {
			auth,
			product,
			category,
			provider,
			customer,
			stockEntry,
			role
		},

		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV
	});

	return Store;
}
