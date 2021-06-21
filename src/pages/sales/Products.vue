<template>
	<q-page padding>
		<!-- <div class="q-pa-md">
         <q-input
        v-model="search"
        filled
        square
        rounded 
        dense
        placeholder="Pesquisa"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

        </div> -->
		{{ prod }}
		<q-list>
			<q-scroll-area style="height: 400px">
				<div v-for="(product, index) in myProducts" :key="index">
					<product-component
						:product="Object.assign({ id: index }, product)"
						:productId="index"
					/>
				</div>
			</q-scroll-area>
		</q-list>

		<div v-if="Object.keys(myProducts).length > 0">
			<download-excel
				class="q-px-md"
				:data="json_data"
				:fields="json_fields"
				worksheet="Produtos Exportados para balconista"
				name="meusProdutos.xls"
			>
				<q-btn
					color="green-7"
					icon="save_alt"
					label="Excel"
					unelevated
				/>
			</download-excel>
		</div>
	</q-page>
</template>

<script>
import JsonExcel from 'vue-json-excel';

import ProductComponent from '../../components/sales/products/ProductsComponent';
import { mapActions, mapState, mapGetters } from 'vuex';
Vue.component('downloadExcel', JsonExcel);
import Vue from 'vue';

export default {
	data() {
		return {
			search: '',
			productChecked: {},
			json_fields: {
				codigo: 'code',
				Produto: 'name',

				Quantidade: 'quantity',
				PrecoRetalho: 'price_payd',
				PrecoGrosso: 'grosso',
				Balconista: 'createdBy'
			},
			json_data: [],
			json_meta: [
				[
					{
						key: 'charset',
						value: 'utf-8'
					}
				]
			]
		};
	},
	computed: {
		...mapState('product', [
			'products',
			'checkedProducts',
			'productFiltered'
		]),
		...mapGetters('checkedProduct', ['getCheckedProducts']),
		...mapState('checkedProduct', ['checkedProducts']),
		...mapState('checkedProduct', ['checkedProducts']),
		...mapState('auth', ['users']),
		...mapGetters('auth', ['getUserName', 'getUserAuth']),

		...mapState('expo', ['expoProducts', 'myProducts']),

		getProductsForSale() {
			const products = {};

			this.myProducts.forEach((element) => {
				const prod = this.myProducts[element];

				this.filterProduc;
			});
		},

		prod() {
			let product = {};
			let produtToJson = {};
			let count = 0;
			Object.keys(this.myProducts).map((element, index) => {
				count = index;
				produtToJson = this.myProducts[element];
				this.json_data[count] = {
					code: produtToJson.code,
					name: produtToJson.name,

					quantity: produtToJson.quantity,
					price_payd: produtToJson.price_buy,
					grosso: produtToJson.grosso,
					createdBy: this.users[this.getUserAuth.id].name
				};
			});

			return '';
		}
	},
	components: {
		ProductComponent
	},
	methods: {
		...mapActions('setting', ['setPageTitle']),
		...mapActions('checkedProduct', [
			'addCheckedProducts',
			'removeChecked'
		]),
		...mapActions('product', [
			'filterDatafromDb',
			'listenProductRealTimeChanges'
		]),
		...mapActions('expo', ['filterMyProducts']),

		addToCard(product) {
			product.qtdUnit = 1;
			product.price = product.price_buy;
			this.addCheckedProducts(product);
		}
	},
	mounted() {
		this.setPageTitle('Produtos');
		this.filterMyProducts(this.getUserAuth.id);
	},
	destroyed() {
		this.setPageTitle('');
		this.listenProductRealTimeChanges();
	},

	watch: {
		search(val) {
			if (!val) {
				this.listenProductRealTimeChanges();
			} else {
				this.filterDatafromDb(val);
			}
		}
	}
};
</script>

<style>
</style>