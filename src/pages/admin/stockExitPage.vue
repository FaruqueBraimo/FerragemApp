<template>
	<q-page padding>
		{{ idExpo }}
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
import { setTimeout } from 'timers';

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
			...mapActions('product', ['updateProduct']),
			...mapActions('expo', [
				'addExpoProduct',
				'getData',
				'updateExpoProduct',
				'filterExpoProduct'
			]),

			register(stockData) {
				// Register for report
				
				if( this.idExpo  ==! '') {
					
					this.updateExpoProduct({
								id:  this.idExpo,
								updates: {
									newQtd:
										  ~~stockData.quantity
								}
							});
				}
				else {
						this.addExpoProduct({
						product: stockData.product,
						user: stockData.user,
						quantity: stockData.quantity,
						createdBy: this.getUserAuth.name
					});

				}

					
				// this.addStockExit(stockData);
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
						qtdBalcony: +lastQtd + newQtd,
						qtdWarehouse: ~~warehouse - ~~newQtd
					}
				});
				setTimeout(() => {
						this.$router.go();
				}, 1500);
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
