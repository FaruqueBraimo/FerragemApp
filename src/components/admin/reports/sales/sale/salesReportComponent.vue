<template>
	<q-dialog
		v-model="toggleDialog"
		@show="onShowDialog"
		
    :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
	>
    <q-card >
			<q-card-section class="row items-center">
				<div class="text-h6 text-left col " > Relatorios de Vendas </div>
				<div class="text-h6 text-cyan-10 col text-center" > Dinheiro Arrecadado  : 70000, 00 MT </div>

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
			id="printMe"
			flat
			bordered
			square
			class="q-pa-md"
			style=" width: 100%"
		>
			<sale-header-component
				class="q-pa-sm"
				@saleFilter="filtersale"
				@saleFilterCategory="saleFilterCategory"
			/>		
		
			<tbody>
              
				<sale-body-component
					v-for="(sale, index) in sales"
					:key="index"
					:sale="Object.assign({ id: index }, sale)"
					:saleId="index"
					@deletesale="removeSale"
				/>
			</tbody>
		</q-markup-table>
			
			</q-card-section>
		</q-card>
		
	
	</q-dialog>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import saleBodyComponent from './saleBodyComponent';
	import saleHeaderComponent from './saleHeaderComponent';

	export default {

        name: 'salesReportComponent',
        props: ['showSale'],

		data() {
			return {
				maximizedToggle: true,
				search: '',

				options: []
			};
		},
		computed: {
			...mapState('sale', [
				'sales',
            ]),
            
            
			toggleDialog: {

				get() {
					return this.showSale;
				},
				set(val) {
					this.$emit('closeDialog');
				}
            },
            
		},
		mounted() {
			this.listenProductRealTimeChanges();
		},

		methods: {
			...mapActions('sale', [
				'deleteSale',
			
			]),
			printTable() {
				// Pass the element id here
				this.$htmlToPaper('printMe');
			},

			removeSale(id) {
				let saleName = this.sales[id].name;
				this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar esta venda ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
						this.deleteSale(id);
					});
			},
			closeDialog() {
				this.dialog = false;
				this.updateCategory = false;
			},
			filtersale(query) {
				this.filterDatafromDb(query);
			},
			saleFilterCategory(query) {
				this.filterCategoryDatafromDb(query);
			}
		},
		components: {
			saleHeaderComponent,
			saleBodyComponent,
		
		},

		watch: {
			search(val) {}
		}
	};
</script>
