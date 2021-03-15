import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import product from './modules/products';
import category from './modules/categories';
import provider from './modules/providers';
import customer from './modules/customers';
import stockEntry from './modules/stockEntries';
import role from './modules/roles';
import notification from './modules/notifications';
import setting from './modules/settings';
import sale from './modules/sales';
import checkedProduct from './modules/checkedProducts';
import invoice from './modules/invoices';
import price from './modules/prices';
import box from './modules/Boxes';
import stockExit from './modules/stockExits';
import expo from './modules/expo'; 
import auxliarExpo from './modules/auxliarExpo';
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
			role,
			invoice,
			sale,
			price,
			notification,
			setting,
			stockExit,
			checkedProduct,
			box,
			expo,
			auxliarExpo
			
		},

		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV
	});

	return Store;
}
