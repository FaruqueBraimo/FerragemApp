<template>
	<q-page padding class="q-pa-md">
		<TableProduc
			@findProductByName="addProductForSale"
			@findProductByCode="findProductByCode"
			@user="user = $event"
			@value="value = $event"
			@subtotals="chance = $event"
		/>

		{{ getStatus }}

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
								>Efectuar Venda</q-item-section
							>
						</q-item>

						<q-separator spaced />

						<q-item
							clickable
							@click="makeInvoice()"
							v-ripple
							:active="link === 'outbox'"
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
	import jsPDF from 'jspdf';
	import autoTable from 'jspdf-autotable';

	export default {
		data() {
			return {
				search: '',
				link: 'inbox',
				productChecked: {},
				disable: true,
				value: {},
				product: [],
				change: ''
				
			};
		},
		computed: {
			...mapState('product', ['products', 'checkedProducts']),
			...mapGetters('checkedProduct', ['getSubTotal']),
			...mapGetters('expo', ['findProductForSale', 'searchProduct']),
			...mapState('checkedProduct', ['checkedProducts']),
			...mapState('expo', [
				'saleProduct',
				'productSearchKey',
				'productToSale'
			]),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapState('box', ['boxs']),
			...mapState('expo', ['myProducts']),

			getStatus() {
				if (this.value.value >= this.value.subtotal) {
					if (Object.keys(this.saleProduct).length > 0) {
						this.disable = false;
					} else {
						this.disable = true;
					}
				} else {
					this.disable = true;
				}
			}
		},
		components: {
			TableProduc
		},
		methods: {
			...mapActions('setting', ['setPageTitle']),
			...mapActions('expo', ['setExpoProductsearchKey']),
			...mapActions('invoice', ['addInvoice', 'removeChecked']),
			...mapActions('expo', ['updateExpoProduct', 'filterMyProducts']),
			...mapActions('sale', ['addSale', 'removeChecked']),
			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
				'updateCheckedProducts'
			]),
			...mapActions('box', ['addBox', 'editBox']),

			makeSale() {
				let saleObject = {};
				saleObject.salesMan = this.getUserAuth.id;
				saleObject.client = this.user ? this.user : 'Não Informado';
				saleObject.value = this.value.value;

				let saleDone = Object.assign(
					{ details: saleObject },
					{ products: this.productToSale }
				);

				// this.addSale(saleDone);
				// this.updateQuantity();
				this.printSale();

				this.updateCash(this.value.subtotal);

				this.$q
					.dialog({
						title: 'Venda Efectuada ',
						message: `A venda foi efectuada com sucesso`,

						ok: 'Ok'
					})
					.onOk(() => {
						// this.$router.go();
					});
			},

			makeInvoice() {
				let invoiceObject = {};
				invoiceObject.invoicesMan = this.getUserAuth.id;
				invoiceObject.client = this.user ? this.user : 'Não Informado';
				invoiceObject.value = this.value.value;

				let invoiceDone = Object.assign(
					{ details: invoiceObject },
					{ products: this.productToSale }
				);

				this.updateQuantity();

				// this.addInvoice(invoiceDone);
				this.$q
					.dialog({
						title: 'Fatura Emitida ',
						message: `A Fatura Emitida com sucesso`,

						ok: 'Ok'
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

			updateQuantity() {
				// Abatendo a quantidade no stock
				// 	let quantity = 0;
				let prodSale = {};
				let product = {};
				Object.keys(this.myProducts).forEach(element2 => {
					let prod = this.myProducts[element2];

					Object.keys(prod.product).forEach(element => {
						product[element] = prod.product[element];
						Object.keys(this.productToSale).forEach(element3 => {

							
							prodSale = this.productToSale[element3];


							if (element == element3) {
							 	product[element].quantitySell -= this.productToSale[element3].newQtd2
							
								this.updateExpoProduct({
									id: element2,
									updates: {
										product: product
									}
								});
							}
						});

						
					});
				});
			},

			findProductByCode() {},


			printSale() {

								var doc = new jsPDF ('p', 'mm', [80,100]);
	var columns = [
					{ title: 'Nome', dataKey: 'id' },
					{ title: 'Quantidade', dataKey: 'name' },
					{ title: 'Subtotal', dataKey: 'country' }
				];

		let		 body = [

  ]

  Object.keys(this.productToSale).forEach(element3 => {
let prod = {} 
prod = this.productToSale[element3];

  	body.push({
					id: prod.name.replace(/\w\S*/g, w =>
							w.replace(/^\w/, c => c.toUpperCase())
						),
						name: prod.newQtd,
						country:
							new Intl.NumberFormat().format(prod.subtotal) +
							' MT'

				});

				});					

this.user ? this.user : 'Não Informado';
									const label = `Recibo do cliente ${
					this.user ? this.user.label : 'Não Informado'
				}`;


				var width = doc.internal.pageSize.getWidth()
doc.text('N-Facilidades', width/2, 20, { align: 'center' })

        doc.setFont('courier')
					.setFontSize(11)


doc.text(3, 25,'--------------------------------',  )

doc.autoTable(columns, body, {
					margin: { top: 27 , left : 1 , right : 1 },
					showHead: 'firstPage',
					theme: 'plain',
					styles: { halign: 'center' ,font : 'courier' },
					

					
				});



// doc.autoTable({html: '#table'});
let finalY = doc.lastAutoTable.finalY; // The y position on the page
doc.text(20, finalY, "!")

doc.text(3, finalY+5,'--------------------------------',  )




				
				doc.save(label + '.pdf');


			},


			addProductForSale(payload) {
				this.setExpoProductsearchKey(payload);
			},

			addToCard(product) {
				this.addCheckedProducts(product);
			}
		},
		mounted() {
			this.setPageTitle('Editor de Vendas ');
			this.filterMyProducts(this.getUserAuth.id);
		},
		destroyed() {
			this.setPageTitle('');
		}
	};
</script>

<style></style>
