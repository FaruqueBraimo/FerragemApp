<template>
	<q-page padding>
		<TableProduc
			@findProductByName="addProductForExport"
			@findProductByCode="findProductByCode"
			@user="user = $event"
			@obs="obs = $event"
		/>

		<div class="q-pa-md q-mx-xl row justify-center">
			<div class="col-4 justify-center">
				<q-btn
					color="primary"
					class="full-width  q-pa-sm"
					label="Finalizar"
					@click="ExportProduct()"
					:loading="loading"
				>
					<q-tooltip content-class="bg-accent"
						>Exportar para o utlizador</q-tooltip
					>
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
	import { truncate } from 'fs';
	import Vue from 'vue';

	export default {
		// name: 'PageName',
		data() {
			return {
				dialog: false,
				updateObject: {},
				user: '',
				obs: ''
			};
		},
		computed: {
			...mapState('product', ['products']),
			...mapState('stockExit', ['stockExits']),
			...mapState('expo', ['expoProducts', 'expoProducts']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapState('product', ['exportedProducts', 'products']),
			...mapState('stockExit', ['loading'])
		},

		methods: {
			...mapActions('stockExit', ['addStockExit', 'deleteStockExit']),
			...mapActions('product', [
				'updateProduct',
				'addProductForExport',
				'findProductByCode'
			]),
			...mapActions('expo', [
				'addExpoProduct',
				'getData',
				'updateExpoProduct',
				'filterExpoProduct', 'addOrUpdateExportedProducts'
			]),

			...mapActions('auxliarExpo', [
				'addAuxiliarExpoProduct',
			 
			]),

			...mapActions('setting', ['setPageTitle']),

			ExportProduct() {
				this.user == '' ? (this.user = 'Outros/Externo') : this.user;
				let statusSave = false;
				const productToSave = {};
				let checkOut = Object.assign(
					{
						createdBy: this.getUserAuth.name,
						statusDelivery: false,
						user: this.user,
						obs: this.obs
					},
					{ products: this.exportedProducts }
				);

				let quantity = 0;
				
			
				this.addStockExit(checkOut);

				if (Object.keys(this.expoProducts).length == 0) {
						
						Object.keys(this.exportedProducts).forEach(element2 => {

								this.addAuxiliarExpoProduct({
										productId: element2,
										name: this.exportedProducts[element2]
											.name,
										quantity: ~~this.exportedProducts[
											element2
										].newQtd,
										user: this.user,
										createdBy: this.getUserAuth.name,
										statusDelivery: false,
										code: this.exportedProducts[element2]
											.code,
										grosso: this.exportedProducts[element2]
											.grosso,
										price_buy: this.exportedProducts[
											element2
										].price_buy
									})
					
							});


				
				} else {

					//update a fucking product stock quantity
					 Object.keys(this.products).forEach((element, key) => {
					Object.keys(this.exportedProducts).forEach(element2 => {
						if (element == element2) {
							let product = this.products[element];
							quantity =
								product.quantity -
								~~this.exportedProducts[element2].newQtd;
							this.updateProduct({
								id: element,
								updates: { quantity: quantity }
							});

						 
						}
 
					});
				});


				}

			 
					Object.keys(this.exportedProducts).forEach(element2 => {

							this.addAuxiliarExpoProduct({
										productId: element2,
										name: this.exportedProducts[element2]
											.name,
										quantity: ~~this.exportedProducts[
											element2
										].newQtd,
										user: this.user,
										createdBy: this.getUserAuth.name,
										statusDelivery: false,
										code: this.exportedProducts[element2]
											.code,
										grosso: this.exportedProducts[element2]
											.grosso,
										price_buy: this.exportedProducts[
											element2
										].price_buy
									})

						
							});

 
				// this.$router.push('/saidas');.bundleRenderer.renderToStream
 


			},

			printTable() {
				// Pass the element id here
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
