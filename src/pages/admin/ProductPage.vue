<template>
	<q-page padding>
		<div class="row justify-end q-py-sm">
			<download-excel
				class="q-px-md "
				:data="json_data"
				:fields="json_fields"
				worksheet="My Worksheet"
				name="produtos.xls"
			>
				<q-btn
					color="green-7"
					icon="save_alt"
					label="Excel"
					unelevated
				/>
			</download-excel>
			{{ prod }}
			<q-btn
				color="primary"
				icon="add"
				label="Adicionar"
				unelevated
				@click="$router.push('/products/add/' + 0)"
			/>
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

			<tbody v-if="products">
				<products-body-component
					v-for="(product, index, posiction) in products"
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
		<div class="row justify-end q-mt-md">
			<q-btn
				color="teal"
				icon="check"
				label="Carregar mais"
				@click="getData"
			/>
		</div>

		<div class="row justify-center q-mt-md">
			<q-inner-loading :showing="loading">
				<q-spinner-pie color="orange" size="50px" />
			</q-inner-loading>
		</div>
	</q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import ProductsBodyComponent from '../../components/admin/product/ProductsBodyComponent';
	import ProductsHeaderComponent from '../../components/admin/product/ProductsHeaderComponent';
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
					Produto: 'name',
					Referência: 'reference',
					Categoria: 'category'
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
			...mapGetters('product', ['searchProduct']),

			prod() {
				let product = {};
				let produtToJson = {};
				let count = 0;
				Object.keys(this.products).map((element, index) => {
					count = index;
					produtToJson = this.products[element];
					this.json_data[count] = {
						name: produtToJson.name,
						Referência: produtToJson.reference,
						category: produtToJson.category.label
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
			printTable() {
				// Pass the element id here
				this.$htmlToPaper('printMe');
			},

			removeProduct(id) {
				let productName = this.products[id].name;
				this.$qprod
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar o produto ${productName} ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
						this.deleteProduct(id);
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
			AddUserDialog
		},

		watch: {
			search(val) {}
		}
	};
</script>
