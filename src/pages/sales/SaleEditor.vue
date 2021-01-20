<template>
	<q-page padding class="q-pa-md">
		<TableProduc
			@findProductByName="addProductForSale"
			@findProductByCode="findProductByCode"
			@user="user = $event"
			@value="value = $event"
			@subtotals="chance = $event"
		/>

		{{getStatus}}

		<div class="q-pa-md q-mx-xl row justify-center">
			<div class="col-4 justify-center">
				<q-btn-dropdown
					color="primary"
					label="Finalizar operação"
					:disable="disable"
				>
					<q-list
						bordered
						padding
						class="rounded-borders text-primary q-pa-md"
					>
						<q-item
							clickable
							v-ripple
							:active="link === 'inbox'"
						
							active-class="my-menu-link"
							@click="makeSale()"
						>
							<q-item-section avatar>
								<q-icon
									name="attach_money"
									color="deep-orange"
								/>
							</q-item-section>

							<q-item-section class="text-deep-orange"
								>Efectuar Vender</q-item-section
							>
						</q-item>

						<q-separator spaced />

						<q-item
							clickable
							v-ripple
							:active="link === 'outbox'"
							@click="link = 'outbox'"
							active-class="my-menu-link"
						>
							<q-item-section avatar>
								<q-icon name="receipt" />
							</q-item-section>

							<q-item-section>Factura</q-item-section>
						</q-item>

						<q-item
							clickable
							v-ripple
							:active="link === 'trash'"
							@click="link = 'trash'"
							active-class="my-menu-link"
						>
							<q-item-section avatar>
								<q-icon name="book" />
							</q-item-section>

							<q-item-section>Cotacão</q-item-section>
						</q-item>
					</q-list>
				</q-btn-dropdown>
			</div>
		</div>
	</q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';

	import TableProduc from '../../components/sales/editor/TableProduc';
	export default {
		data() {
			return {
				search: '',
				link: 'inbox',
				productChecked: {},
				disable: true,
				value: {},
				change : ''
			};
		},
		computed: {
			...mapState('product', ['products', 'checkedProducts']),
			...mapGetters('checkedProduct', ['getSubTotal']),
			...mapGetters('expo', ['findProductForSale', 'searchProduct']),
			...mapState('checkedProduct', ['checkedProducts']),
			...mapState('expo', ['saleProduct', 'productSearchKey']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
						...mapState('box', ['boxs']),


			getStatus() {
			
			if (this.value.value > this.value.subtotal) {

				if(Object.keys(this.saleProduct).length  > 0) {
					this.disable = false
				}
				else{
						this.disable = true
				}
					
				}
				else {
					this.disable = true
				}
			
			}
		},
		components: {
			TableProduc
		},
		methods: {
			...mapActions('setting', ['setPageTitle']),
			...mapActions('expo', ['setExpoProductsearchKey']),
	         ...mapActions('sale', ['addSale', 'removeChecked']),
			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
				'updateCheckedProducts'
			]),
						...mapActions('box', ['addBox', 'editBox']),


			makeSale() {
				let saleObject = {};
				saleObject.salesMan = this.getUserAuth.id ;
				saleObject.client =  this.user ? this.user  : 'Não Informado'
				saleObject.value =  this.value.value
				
				let saleDone = Object.assign(
				{  details :   saleObject},
				 { products :  this.saleProduct}
				);
					
					
				this.addSale(saleDone);
				
				 this.updateCash(this.value.subtotal);

				this.$q
					.dialog({
						title: 'Venda Efectuada ',
						message: `A venda foi efectuada com sucesso`,
						
						ok: 'Ok',
					})
					.onOk(() => {
						this.$router.go()
					});
			},

			updateCash(newChas) {
				Object.keys(this.boxs).forEach(element => {
					let box = this.boxs[element];
					const oldChash = box.value;

					if (
						box.createdBy.id === this.getUserAuth.id &&
						box.status
					) {
						this.editBox({
							id: element,
							updates: { value: ~~oldChash + ~~newChas }
						});
					}
				});
			},



			findProductByCode() {},

			addProductForSale(payload) {
				this.setExpoProductsearchKey(payload);
			},

			addToCard(product) {
				this.addCheckedProducts(product);
			}
		},
		mounted() {
			this.setPageTitle('Editor de Vendas ');
		},
		destroyed() {
			this.setPageTitle('');
		}
	};
</script>

<style></style>
