<template>
	<q-page padding>

		<TableProduc
		 @findProductByName='addProductForExport'

		/>

		 <div class="q-pa-md q-mx-xl row justify-center">
		 <div class = 'col-4 justify-center'>
		   <q-btn color="primary" class="full-width  q-pa-sm" label="Finalizar" >
			 <q-tooltip content-class="bg-accent">Exportar para o utlizador</q-tooltip>
	</q-btn>

		  </div>


  </div>


	</q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
   import TableProduc from '../../components/admin/stock/Exit/editor/TableProduc';
	import stockExitBodyComponent from '../../components/admin/stock/Exit/stockExitBodyComponent';
	import stockExitHeaderComponent from '../../components/admin/stock/Exit/stockExitHeaderComponent';
	import AddExitStockComponent from '../../components/admin/stock/Exit/AddExitStockComponent';
	import { setTimeout } from 'timers';
	import { dbExpoProducts } from '../../boot/firebase';

	export default {
		// name: 'PageName',
		data() {
			return {
				dialog: false,
				updateObject: {}
			};
		},
		computed: {
			...mapState('product', ['products']),
			...mapState('stockExit', ['stockExits']),
			...mapState('expo', ['expoProducts', 'idExpo']),
			...mapGetters('auth', ['getUserName', 'getUserAuth'])
		},

		methods: {
			...mapActions('stockExit', ['addStockExit', 'deleteStockExit']),
			...mapActions('product', ['updateProduct','addProductForExport']),
			...mapActions('expo', [
				'addExpoProduct',
				'getData',
				'updateExpoProduct',
				'filterExpoProduct'
			]),

	  ...mapActions('setting', ['setPageTitle']),


			updateExpo(id) {
				console.log(id);
			},

			register(stockData) {

			if (Object.keys(this.expoProducts).length > 0) {


					if(stockData.hasOwnProperty('IdExpo') ) {

							this.updateExpoProduct({
								id: stockData.IdExpo,
								updates: {
									newQtd: ~~stockData.quantity,
									updatedBy: this.getUserAuth.name,
									statusDelivery : false
								}
							});
					}
					else{
						this.addExpoProduct({
						product: stockData.product,
						user: stockData.user,
						quantity: stockData.quantity,
						createdBy: this.getUserAuth.name,
						statusDelivery : false


					});
					}




				} else {
					this.addExpoProduct({
						product: stockData.product,
						user: stockData.user,
						quantity: stockData.quantity,
						createdBy: this.getUserAuth.name,
						statusDelivery : false
					});
				}




				 this.addStockExit(stockData);
				let lastQtd = ~~this.products[stockData.product.value]
					.qtdBalcony;
				let newQtd = ~~stockData.quantity;
				let warehouse = this.products[stockData.product.value]
					.qtdWarehouse;

				// Export data for user


				this.getData();
				// update product quantity
				this.updateProduct({
					id: stockData.product.value,
					updates: {

						qtdWarehouse: ~~warehouse - ~~newQtd
					}
				});
			},

			removeCategory(id) {
				this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar entrada  ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
						this.deleteStockExit(id);
					});
			}
		},
		mounted() {
			this.getData();
				this.setPageTitle('Editor de Exportação de produtos ');
		},
		components: {
			stockExitHeaderComponent,
			stockExitBodyComponent,
			AddExitStockComponent,
			TableProduc
		},
		watch: {
			updateObject(val) {
				if (val) {
					this.dialog = true;
				}
			}
		},

		updated() {
			this.getData();
		}
	};
</script>
