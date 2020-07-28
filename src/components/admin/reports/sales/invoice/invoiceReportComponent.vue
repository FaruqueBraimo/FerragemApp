<template>
	<q-dialog
		v-model="toggleDialog"
		
    :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
	>
	
    <q-card >
			<q-card-section class="row items-center">
				<div class="text-h6 text-left col " > Relatorios de Facturas geradas </div>
				<div class="text-h6 text-red-5 col text-center" > Dinheiro por Receber  : {{getTotalMoney}}, 00 MT </div>

				<q-space />
				<q-btn
					icon="close"
					flat
					round
					dense
					@click="$emit('closeDialog')"
				/>
			</q-card-section>
			<q-card-section>
                <q-markup-table
			flat
			bordered
			square
			class="q-pa-md"
			style=" width: 100%"
		>
			<invoice-header-component
				class="q-pa-sm"
				@invoiceFilter="filterinvoice"
				@invoiceFilterCategory="invoiceFilterCategory"
			/>
                </q-markup-table>		
		
		
            <div class="row 	">
          <div class=" col-4 q-pa-md  "	v-for="(invoice, index) in invoices" :key="index">
				<invoice-body-component
					:invoice="Object.assign({ id: index }, invoice)"
					:invoiceId="index"
					@deleteinvoice="removeInvoice"
				/>
				</div>
			</div>
		
			
		
			
			</q-card-section>
		</q-card>
		
	
	</q-dialog>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import invoiceBodyComponent from './invoiceBodyComponent';
	import invoiceHeaderComponent from './invoiceHeaderComponent';

	export default {

        name: 'invoicesReportComponent',
        props: ['showInvoice'],

		data() {
			return {
				maximizedToggle: true,
				search: '',

				options: []
			};
		},
		computed: {
			...mapState('invoice', [
				'invoices',
			]),
			
        getTotalMoney() {

				let money = 0;
				Object.keys(this.invoices).forEach((element, key) => {
					let prod = this.invoices[element] ? this.invoices[element].details.subtotal : 0
					
					money =  money + prod

				});
				return money
			},
            
			toggleDialog: {

				get() {
					return this.showInvoice;
				},
				set(val) {
					this.$emit('closeDialog');
				}
            },
            
		},
		mounted() {
		},

		methods: {
			...mapActions('invoice', [
				'deleteInvoice',
			]),
		

			removeInvoice(id) {
				this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar esta factura ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
						this.deleteInvoice(id);
					});
			},
			closeDialog() {
				this.dialog = false;
				this.updateCategory = false;
			},
			filterinvoice(query) {
				this.filterDatafromDb(query);
			},
			invoiceFilterCategory(query) {
				this.filterCategoryDatafromDb(query);
			}
		},
		components: {
			invoiceHeaderComponent,
			invoiceBodyComponent,
		
		},

		watch: {
			search(val) {}
		}
	};
</script>
