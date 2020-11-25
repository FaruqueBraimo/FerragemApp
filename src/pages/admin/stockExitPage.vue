<template>
	<q-page padding>
		{{ expoProducts }}

	 

		<div class="row justify-end q-py-md">
			<q-btn
				color="primary"
				icon="add"
				label="Saida"
				unelevated
				@click="dialog = true"
			/>
		</div>
		<q-markup-table
			flat
			bordered
			square
			class="q-pa-md"
			:style="$q.platform.is.mobile ? 'width: 100%' : ''"
		>
			<stock-Exit-header-component class="q-pa-sm" />

			<tbody>
				<stock-Exit-body-component
					v-for="(stock, index) in stockExits"
					:key="index"
					:stock="Object.assign({ id: index }, stock)"
					:stockId="index"
					@deletestock="removeCategory"
					@updateObject="updateObject = $event"
				/>
			</tbody>
		</q-markup-table>

		<add-exit-stock-component
			:dialog="dialog"
			@closeDialog="dialog = false"
			@emitData="register"
			:updateObject="updateObject"
		/>

		<div></div>
	</q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';

	import stockExitBodyComponent from '../../components/admin/stock/Exit/stockExitBodyComponent';
	import stockExitHeaderComponent from '../../components/admin/stock/Exit/stockExitHeaderComponent';
	import AddExitStockComponent from '../../components/admin/stock/Exit/AddExitStockComponent';

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
			...mapState('expo', ['expoProducts']),
			...mapGetters('auth', ['getUserName', 'getUserAuth'])
		},

		methods: {
			...mapActions('stockExit', ['addStockExit', 'deleteStockExit']),
			...mapActions('product', ['updateProduct']),
			...mapActions('expo', ['addExpoProduct', 'getData','updateExpoProduct']),

			register(stockData) {
				// Register for report

				this.addStockExit(stockData);
				let lastQtd = ~~this.products[stockData.product.value]
					.qtdBalcony;
				let newQtd = ~~stockData.quantity;
				let warehouse = this.products[stockData.product.value]
					.qtdWarehouse;

				// Export data for user

				if (Object.keys(this.expoProducts).length > 0) {


					Object.keys(this.expoProducts).forEach(element => {
						
					let expo = this.expoProducts[element];	
					
					if(stockData.product.value == expo.product.value && stockData.user.value == expo.user.value  ) {

						this.updateExpoProduct({
						id: element,
						updates: {quantity : ~~expo.quantity + ~~stockData.quantity }
						})
					}
					else if(stockData.product.value != expo.product.value && stockData.user.value != expo.user.value  ) {

					this.addExpoProduct({
						product: stockData.product,
						user: stockData.user,
						quantity: stockData.quantity,
						createdBy: this.getUserAuth.name
					});
				}
					});


				} else {
					this.addExpoProduct({
						product: stockData.product,
						user: stockData.user,
						quantity: stockData.quantity,
						createdBy: this.getUserAuth.name
					});
				}

				this.getData();
				// update product quantity
				this.updateProduct({
					id: stockData.product.value,
					updates: {
						qtdBalcony: +lastQtd + newQtd,
						qtdWarehouse: +lastQtd + newQtd,
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
		},
		components: {
			stockExitHeaderComponent,
			stockExitBodyComponent,
			AddExitStockComponent
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
