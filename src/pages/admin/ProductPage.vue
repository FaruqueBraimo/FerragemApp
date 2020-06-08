<template>
	<q-page padding>
		<!-- content -->

		<!-- content -->
<div class="row justify-left q-py-md">
			<q-btn
				color="red"
				label="Testar Codigo de Barra"
				unelevated
				@click="$router.push('/barcode')"
			/>
		</div>
		<div class="row justify-end q-py-md">

			<q-btn
				color="primary"
				icon="add"
				label="Adicionar"
				unelevated
				@click="$router.push('/products/add/' + null)"
			/>
		</div>
		<q-markup-table
			flat
			bordered
			square
			class="q-pa-md"
			:style="$q.platform.is.mobile ? 'width: 100%' : ''"
		>
			<products-header-component class="q-pa-sm"
			@productFilter ='filterproduct'
			 />

			<tbody>
				<products-body-component
					v-for="(product, index) in products"
					:key="index"
					:product="Object.assign({id: index},product)"
					:productId="index"
					@deleteProduct="removeProduct"

				/>
			</tbody>
		</q-markup-table>
					<div class="text-center text-body1" v-if="Object.keys(products).length == 0"> 
					Não existe um produto cadastrado com esse nome. <span class="text-red-5"> Dica: </span> O sistema leva em consideração acentuações, diferença entre letras maiúsculas e minúsculos.  </div>


		
	</q-page>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import ProductsBodyComponent from '../../components/admin/product/ProductsBodyComponent';
	import ProductsHeaderComponent from '../../components/admin/product/ProductsHeaderComponent';
	import AddUserDialog from '../../components/admin/users/AddUserDialog';

	export default {
		// name: 'PageName',
		data() {
			return {
				dialog: false,
				search: ''
			};
		},
		computed: {
			...mapState('product', ['products'])
		},
		


		methods: {
			...mapActions('product', ['deleteProduct', 'filterDatafromDb']),


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
		  }

		},
		components: {
			ProductsHeaderComponent,
			ProductsBodyComponent,
			AddUserDialog,
			 
		}
	};
</script>
