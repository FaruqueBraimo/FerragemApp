<template>
	<q-page padding>
		<div class="q-pa-md row">
			<div class="col-4 q-pa-md">
				<q-card class="my-card" square clickable v-ripple @click="showSale=true" >
					<q-card-section>
						<div class="text-center">
							<q-avatar size="100px" font-size="52px">
								<img src="https://img.icons8.com/plasticine/100/000000/yard-sale.png"/>
							</q-avatar>
						</div>
						<div class="text-subtitle1 text-center q-pt-sm">Vendas</div>
					</q-card-section>
				</q-card>
			</div>
			

			<!-- <div class="col-4 q-pa-md">
				<q-card class="my-card" square clickable 	v-ripple>
					<q-card-section>
						<div class="text-center">
							<q-avatar size="100px" font-size="52px">
								<img
									src="https://img.icons8.com/nolan/128/get-a-discount.png"
								/>
							</q-avatar>
						</div>
						<div class="text-subtitle1 text-center q-pt-sm">Dinheiro a Receber</div>
					</q-card-section>
				</q-card>
			</div> -->

<div class="col-4 q-pa-md">
				<q-card class="my-card" clickable	v-ripple square @click="showInvoice =true">
					<q-card-section>
						<div class="text-center">
							<q-avatar size="100px" font-size="52px">
                                    <img src="https://img.icons8.com/color/96/000000/receipt.png"/>
							</q-avatar>
						</div>
						<div class="text-subtitle1 text-center q-pt-sm">Facturas</div>
					</q-card-section>
				</q-card>
			</div>

<div class="col-4 q-pa-md">
				<q-card class="my-card" clickable  @click='showPrice =true'	v-ripple square>
					<q-card-section>
						<div class="text-center">
							<q-avatar size="100px" font-size="52px" square>
<img src="https://img.icons8.com/plasticine/100/000000/invoice-1.png"/>							</q-avatar>
						</div>
						<div class="text-subtitle1 text-center q-pt-sm">Cotações </div>
					</q-card-section>
				</q-card>
			</div>

            <div class="col-4 q-pa-md">
				<q-card class="my-card" clickable 	v-ripple square>
					<q-card-section>
						<div class="text-center">
							<q-avatar size="100px" font-size="42px" square>
<img src="https://img.icons8.com/office/80/000000/box.png"/>				</q-avatar>
						</div>
						<div class="text-subtitle1 text-center q-pt-sm">Fluxo de Caixa </div>
					</q-card-section>
				</q-card>
			</div>

		</div>
		<sales-report-component
		:showSale='showSale'
		@closeDialog='closeDialog'
		/>

		<invoice-report-component
		:showInvoice='showInvoice'
		@closeDialog='closeDialog'
		/>

		<price-report-component
		:showPrice='showPrice'
		@closeDialog='closeDialog'
		/>


	</q-page>
</template>

<script>
	import salesReportComponent from '../../components/admin/reports/sales/sale/salesReportComponent';
	import priceReportComponent from '../../components/admin/reports/sales/price/priceReportComponent';

	import invoiceReportComponent from '../../components/admin/reports/sales/invoice/invoiceReportComponent';
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'ReportSalePage',

		components: {
			
			salesReportComponent,invoiceReportComponent,priceReportComponent
		},
		computed: {
			...mapState('sale', ['sales'])
		},

		data() {
			return {
				dialog: false,
				showSale: false,
				showInvoice: false,
				showPrice:false
			};
		},
		methods: {
			...mapActions('category', ['addcategory', 'deleteCategory']),

			removeCategory(id) {
				let categoryName = this.categories[id].name;
				this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar a categoria ${categoryName} ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
						this.deleteCategory(id);
					});
			},
			closeDialog() {
				this.showSale = false;
				this.showInvoice = false;
				this.showPrice=false
				this.updateCategory = false;
			}
		}
	};
</script>

<style></style>
