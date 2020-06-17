<template>
	<q-page padding>
		<!-- content -->

		<!-- content -->
<div class="row justify-left">
			<!-- <q-btn
				color="red"
				label="Testar Codigo de Barra"
				unelevated
				@click="$router.push('/barcode')"
			/> -->
			<!-- <q-btn
				color="deep-orange"
				label="Imprimir"
				@click="printTable()"

			/> -->
			
		</div>
		<div class="row justify-end q-py-sm">

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
			<products-header-component class="q-pa-sm"
			@productFilter ='filterproduct'
			@productFilterCategory='productFilterCategory'
			 />

			<tbody>
				<products-body-component
					v-for="(product, index) in Object.keys(productFiltered).length > 0 ?  productFiltered  : products"
					:key="index"
					:product="Object.assign({id: index},product)"
					:productId="index"
					@deleteProduct="removeProduct"

				/>
			</tbody>
		</q-markup-table>
					<div class="text-center text-body1" v-if="Object.keys(products).length == 0   &&  Object.keys(productFiltered).length == 0 "> 
			 <q-icon name="sentiment_very_dissatisfied" color="red" size="lg"/>	<span class="text-red-5">  Sem dados retornados </span>  </div>


		
	</q-page>
</template>

<script>
	import { mapActions, mapState , mapGetters } from 'vuex';
	import ProductsBodyComponent from '../../components/admin/product/ProductsBodyComponent';
	import ProductsHeaderComponent from '../../components/admin/product/ProductsHeaderComponent';
	import AddUserDialog from '../../components/admin/users/AddUserDialog';
	import VueHtmlToPaper from 'vue-html-to-paper';
	export default {
		 name: 'ProductPage',
		data() {
			return {
				dialog: false,
				search: '',
				
				options : [
					
				]
			};
		},
		computed: {
			...mapState('product', ['products', 'productFiltered']),
			...mapGetters('product', ['searchProduct'])
		},
		


		methods: {
			...mapActions('product', ['deleteProduct', 'filterDatafromDb','filterCategoryDatafromDb', 'setProductSearchKey']),
	printTable () {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    },

			 removeProduct(id) {
            let productName = this.products[id].name
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
							this.deleteProduct(id);
					});

          },
          closeDialog() {
            this.dialog=false;
            this.updateCategory=false;
		  },
		  filterproduct(query){
			
			  this.filterDatafromDb(query)

		  },
		   productFilterCategory(query){
			  this.filterCategoryDatafromDb(query)
		  }

		},
		components: {
			ProductsHeaderComponent,
			ProductsBodyComponent,
			AddUserDialog,
			 
		},

		watch: {
			search(val) {

					
				
			}
		},
		
	};
</script>
