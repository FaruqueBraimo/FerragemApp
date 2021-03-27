<template>
	<q-page padding>
		<div class="row justify-end q-py-sm">
			<download-excel
				class="q-px-md "
				:data="json_data"
				:fields="json_fields"
				worksheet="Produtos Cadastrados"
				name="produtosbalcao.xls"
			>
				<q-btn
					color="green-7"
					icon="save_alt"
					label="Excel"
					unelevated
				/>


				
			</download-excel>
			{{ prod }}
			
		</div>
		<q-markup-table
			id="printMe"
			flat
			bordered
			square
			class="q-pa-md"
			:style="$q.platform.is.mobile ? 'width: 100%' : ''"
		>
			<products-header-component
				class="q-pa-sm"
				@productFilter="filterproduct"
				@productFilterCategory="productFilterCategory"
				@referenceFilter="productFilterByReference"
			/>

			<tbody >
				<products-body-component
					v-for="(product, index, posiction) in expoProducts"
					:key="index"
					:posiction="posiction"
					:product="Object.assign({ id: index }, product)"
					:productId="index"
					@deleteProduct="removeProduct"
				/>
			</tbody>

			<tbody>
				<products-body-component
					v-for="(product, index) in productFilteredCategory"
					:key="index"
					:product="Object.assign({ id: index }, product)"
					:productId="index"
					@deleteProduct="removeProduct"
				/>
			</tbody>
		</q-markup-table>
		<div
			class="text-center text-body1"
			v-if="
				Object.keys(products).length == 0 &&
					Object.keys(productFiltered).length == 0 &&
					Object.keys(productFilteredCategory).length == 0
			"
		>
			<q-icon name="sentiment_very_dissatisfied" color="red" size="lg" />
			<span class="text-red-5"> Sem dados retornados </span>
		</div>
		<!-- <div class="row justify-end q-mt-md">
			<q-btn
				color="teal"
				icon="check"
				label="Carregar mais"
				@click="getData"
			/>
		</div> -->

		<div class="row justify-center q-mt-md">
			<q-inner-loading :showing="loading">
				<q-spinner-pie color="orange" size="50px" />
			</q-inner-loading>
		</div>
	</q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import ProductsBodyComponent from '../../components/admin/delete/expoBodyComponent';
	import ProductsHeaderComponent from '../../components/admin/delete/expoHeaderComponent';
	import AddUserDialog from '../../components/admin/users/AddUserDialog';
	import VueHtmlToPaper from 'vue-html-to-paper';
	import Vue from 'vue';
	import JsonExcel from 'vue-json-excel';
	import { log } from 'util';
	import products from 'src/store/modules/products';

	Vue.component('downloadExcel', JsonExcel);

	export default {
		name: 'ProductPage',
		data() {
			return {
				dialog: false,
				search: '',

				options: [],
				json_fields: {
					codigo : 'code',
					Produto: 'name',
					Quantidade : 'quantity',
					PrecoRetalho  : 'price_payd', 
					PrecoGrosso : 'grosso',
					Balconista : 'Balconista',
					CriadoPor : 'createdBy'



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
				'productFiltered',
				'productFilteredCategory',
				'loading'
			]),
						...mapState('auth', ['users']),

			...mapGetters('product', ['searchProduct']),
            			...mapState('expo', ['expoProducts', 'expoProducts']),


			prod() {
				let product = {};
				let produtToJson = {};
				let count = 0;
				Object.keys(this.expoProducts).map((element, index) => {
					count = index;
					produtToJson = this.expoProducts[element];
					this.json_data[count] = {
						code : produtToJson.code,
						name: produtToJson.name,
						quantity : produtToJson.quantity,
						price_payd : produtToJson.price_buy,
						grosso : produtToJson.grosso,
						Balconista :  produtToJson.user.label,
						createdBy :   produtToJson.createdBy
					};
				});

				return '';
			},

			sendProduts() {
				let element = [];
				Object.keys(this.prod).map(key => {});

				return this.json_data;
			}
		},
		mounted() {
			this.listenProductRealTimeChanges();
		},

		methods: {
			...mapActions('product', [
				'deleteProduct',
				'listenProductRealTimeChanges',
				'filterDatafromDb',
				'filterCategoryDatafromDb',
				'setProductSearchKey',
				'filterByReference',
				'getData'
			]),
            ...mapActions('expo', ['deleteExpoProduct']),
			printTable() {
				// Pass the element id here
				this.$htmlToPaper('printMe');
			},

			removeProduct(id) {
				let productName = this.expoProducts[id].name;
				this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar o produto ${productName} ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
						this.deleteExpoProduct(id);
						
					});
			},
			closeDialog() {
				this.dialog = false;
				this.updateCategory = false;
			},
			filterproduct(query) {
				this.filterDatafromDb(query);
			},
			productFilterCategory(query) {
				this.filterCategoryDatafromDb(query);
			},
			productFilterByReference(query) {
				this.filterByReference(query);
			}
		},
		components: {
			ProductsHeaderComponent,
			ProductsBodyComponent,
			
		},

		watch: {
			search(val) {}
		}
	};
</script>
