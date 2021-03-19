<template>
	<q-page padding class="q-pa-md">
		<TableProduc
			@findProductByName="addProductForSale"
			@findProductByCode="findProductByCode"
			@user="user = $event"
			@value="value = $event"
			@total="total = $event"
			
			@subtotals="chance = $event"
		/>

		{{ getStatus }}   <q-btn color="primary" icon="check" label="OK" @click="printSaleImproved" />
		<div class="q-pa-md q-mx-xl row justify-center">
			<div class="col-4 justify-center">
				<q-btn-dropdown
					color="primary"
					label="Finalizar operação"
					
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
							:disable='disable'
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
							
						>
							<q-item-section avatar>
								<q-icon name="receipt" />
							</q-item-section>

							<q-item-section>Factura</q-item-section>
						</q-item>

						<q-item
							clickable
							v-ripple
								@click="printInvoice('Cotação')"
							
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
	import pdfMake from "pdfmake/build/pdfmake";
		import pdfFonts from "pdfmake/build/vfs_fonts";
		pdfMake.vfs = pdfFonts.pdfMake.vfs;

	export default {
		data() {
			return {
				search: '',
				link: 'inbox',
				productChecked: {},
				disable: true,
				value: {},
				product: [],
				total : '',
				change: '',
				body: [],
					moreText: [
					`Loja      : N-facilidades - Vendas & Serviços`,
					`Local     : Milange - Zambezia`,
					`Nuit      : 401151192 `,
					`Contacto  : 864023773`,
					`Prazo Pagamento : `
				]
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
				if (this.value.value >= this.total) {
					if (Object.keys(this.saleProduct).length > 0) {
						this.disable = false;
					} else {
						this.disable = true;
					}
				} else {
					this.disable = true;
				}
			},

			getDateTime() {
				var months = [
					'Jan',
					'Fev',
					'Mar',
					'Abr',
					'Mai',
					'Jun',
					'Jul',
					'Agost',
					'Set',
					'Out',
					'Nov',
					'Dez'
				];
				let dateCreated = new Date();
				return (
					dateCreated.getDate() +
					' ' +
					months[dateCreated.getMonth()] +
					' ' +
					dateCreated.getFullYear()
				);
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
			  this.updateQuantity();

				let saleObject = {};
				saleObject.salesMan = this.getUserAuth.id;
				saleObject.client = this.user ? this.user : 'Não Informado';
				saleObject.value = this.value.value ;
				saleObject.total = 	 this.total;
				let saleDone = Object.assign(
					{ details: saleObject },
					{ products: this.productToSale }
				);

				this.addSale(saleDone);
				this.printSale();

				this.updateCash(this.total);

				this.$q
					.dialog({
						title: 'Venda Efectuada ',
						message: `A venda foi efectuada com sucesso`,

						ok: 'Ok'
					})
					.onOk(() => {
						  this.$router.go();
					});
			},

			makeInvoice() {
				this.updateQuantity();
				let invoiceObject = {};
				invoiceObject.invoicesMan = this.getUserAuth.id;
				invoiceObject.client = this.user ? this.user : 'Não Informado';
				
				invoiceObject.status = true;
				invoiceObject.total = 	 this.total; 

				let invoiceDone = Object.assign(
					{ details: invoiceObject },
					{ products: this.productToSale }
				);

				this.addInvoice(invoiceDone);
				 this.printInvoice('Factura');
				this.$q
					.dialog({
						title: 'Fatura Emitida ',
						message: `A Fatura Emitida com sucesso`,

						ok: 'Ok'
					})
					.onOk(() => {
						 this.$router.go();
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
				let quantity = 0;
				Object.keys(this.myProducts).forEach(element2 => {
					let prod = this.myProducts[element2];
 		Object.keys(this.productToSale).forEach(element3 => {
							prodSale = this.productToSale[element3];
							if (prodSale.productId  == prod.productId) {
								
							      
								quantity  =  prod.quantity -  prodSale.newQtd 
								
								if(quantity > 0) {
								    this.updateExpoProduct({
									id: element2,
									updates: { quantity: quantity }
								});
								}
								
								
								console.log('remanescente',  quantity  )
							}
						});
					});
			 
			},

			findProductByCode() {},

			printSale() {

				
				var doc = new jsPDF('p', 'mm', [80, 100]);
				var columns = [
					{ title: 'Nome', dataKey: 'id' },
					{ title: 'Preço ', dataKey: 'price' },
					{ title: 'Qnt', dataKey: 'name' },
					{ title: 'Valor', dataKey: 'country' }
				];

				let body = [];

				Object.keys(this.productToSale).forEach(element3 => {
					let prod = {};
					prod = this.productToSale[element3];

					body.push({
						id: prod.name.replace(/\w\S*/g, w =>
							w.replace(/^\w/, c => c.toUpperCase())
						),

						name: this.productToSale[element3].newQtd ,
						 price : new Intl.NumberFormat().format( this.productToSale[element3].priceType || 0) ,	
						country:
							new Intl.NumberFormat().format(this.productToSale[element3].subtotal) 
							
					});
				});

				this.user ? this.user : 'Não Informado';
				const label = `Recibo do cliente ${
					this.user ? this.user.label : 'Não Informado'
				}`;

				var width = doc.internal.pageSize.getWidth();
				doc.text('N-Facilidades', width / 2, 8, { align: 'center' });
				doc.setFontSize(11);
				doc.text('Vendas & Serviços', width / 2, 12, {
					align: 'center'
				});

				doc.setFont('courier').setFontSize(11);

				doc.text(8, 18, 'Nuit :   401151192 ');

				doc.text(8, 22, 'Data : ');
				doc.text(30, 22, this.getDateTime);

				doc.text(8, 26, 'Vendedor: ');
				doc.text(30, 26, this.getUserAuth.name);

				doc.text(8, 30, 'Cliente: ');
				doc.text(30, 30, this.user ? this.user.label : 'Não Informado');

				doc.text(3, 34, '--------------------------------');

				doc.autoTable(columns, body, {
					margin: { top: 34, left: 1, right: 1 },
					 didDrawPage: function (data) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    data.settings.margin.top = 5; 
					 },
					showHead: 'firstPage',
					theme: 'plain',
					styles: { halign: 'center', font: 'courier' }
				});

				// doc.autoTable({html: '#table'});
				let finalY = doc.lastAutoTable.finalY; // The y position on the page

				doc.text(3, finalY + 5, '--------------------------------');

				doc.text(8, finalY + 10, 'Total : ');
				const total =
					new Intl.NumberFormat().format(this.total) + ' MT';
				doc.text(45, finalY + 10, total.toString());

				doc.text(8, finalY + 15, 'Valor Dado : ');
				const value =
					new Intl.NumberFormat().format(this.value.value) + ' MT';
				doc.text(45, finalY + 15, value.toString());

				doc.text(8, finalY + 20, 'Troco : ');
				const operator = this.value.value - this.total;
				const change = new Intl.NumberFormat().format(operator) + ' MT';
				doc.text(45, finalY + 20, change.toString());

				doc.text(3, finalY + 30, '--------------------------------');

				doc.setFont('Helvetica').setFontSize(11);
				doc.text(20, finalY + 38, 'Obrigado - 864023773    ');

				doc.save(label + '.pdf');
			},

			printInvoice(type) {
				var columns = [
					{ title: 'Nome', dataKey: 'id' },
						{ title: 'Preço ', dataKey: 'price' },
					{ title: 'Quantidade', dataKey: 'name' },
					{ title: 'Subtotal', dataKey: 'country' }
				];

				var summary = [
					{ title: 'Total', dataKey: 'sub' },
					{ title: 'Data ', dataKey: 'data' },
					{ title: 'Cliente', dataKey: 'user' },
					{ title: 'Balconista', dataKey: 'admin' }
				];
				var rows = [];

				Object.keys(this.productToSale).forEach(element3 => {
					let prod = {};
					prod = this.productToSale[element3];

					rows.push({
						id: prod.name.replace(/\w\S*/g, w =>
							w.replace(/^\w/, c => c.toUpperCase())
						),
						price : new Intl.NumberFormat().format( this.productToSale[element3].priceType || 0) ,	

						name: this.productToSale[element3].newQtd ,

						country:
							new Intl.NumberFormat().format(this.productToSale[element3].subtotal) +
							' MT'
					});
				});

				this.body.push({
					sub:
						new Intl.NumberFormat().format(this.total) +
						' MT',
					data: this.getDateTime,
					admin: this.getUserAuth.name,
					user: this.user ? this.user.label : 'Não Informado'
				});
				var doc = new jsPDF('p', 'pt');

				doc.setFontSize(15);
				doc.text(
					20,
					40,
					`                                ${type} de Entrega de Produtos                      `
				);

				doc.line(35, 45, 550, 45);

				doc.setFont('helvetica')
					.setFontSize(12)
					.text(this.moreText, 45, 70);

				doc.autoTable(summary, this.body, {
					styles: { fillColor: [16, 18, 33] },
					margin: { top: 135 },
					beforePageContent: function(data) {}
				});

				doc.autoTable(columns, rows, {
					margin: { top: 135 },
					beforePageContent: function(data) {}
				});

				doc.setFont('times')
					.setFontSize(11)

					.text(
						'Processado Por Computador  N-Facilidades',
						20,
						doc.internal.pageSize.height - 10
					);

				this.user ? this.user : 'Não Informado';
				const label = `${type} do cliente ${
					this.user ? this.user.label : 'Não Informado'
				}`;

				doc.save(label + '.pdf');
				this.body = [];
			},

			addProductForSale(payload) {
				this.setExpoProductsearchKey(payload);
			},

			addToCard(product) {
				
				this.addCheckedProducts(product);
			},


			printSaleImproved(){
			var dd = {
  pageSize: {
    width: 200,
    height: 'auto'
  },
  defaultStyle: {
    font: 'courier'
  },
   pageMargins: [ 10, 10, 10, 10 ],
   
 content: [
		{
			table: {
				
				headerRows: 1,
					widths: [500, '*', '*', '*'],
				body: [
					[{ text: 'Nome', style: 'tableHeader', }, { text: 'Preço', style: 'tableHeader' },{ text: 'Qnt', style: 'tableHeader' }, { text: 'Valor', style: 'tableHeader' }],
					['Sample value 1', '55', '555', '555'],
					['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3'],
					['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3'],
				]
			},
			layout: 'noBorders'
		},
  ]
}
pdfMake.fonts = {
   courier: {
     normal: 'Courier Regular.ttf',
    
   },
   
}
				pdfMake.createPdf(dd).download();


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
