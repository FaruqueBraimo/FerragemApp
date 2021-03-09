<template>
	<q-dialog
		v-model="toggleDialog"
		
    :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
	>
	
    <q-card >
			<q-card-section class="row items-center">
				<div class="text-h6 text-left col " > Relatorios de Vendas </div>
				<!-- <div class="text-h6 text-cyan-10 col text-center" > Dinheiro Arrecadado  : {{  getTotalFilteredMoney|| getTotalMoney }}, 00 MT </div> -->

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
			<sale-header-component
				class="q-pa-sm"
				@filterCategory="setSalesearchKey"
			     @filterByUser="setSalesearchKey"
			/>


			
                </q-markup-table>	
				
		
		  <div class="row justify-left	" v-if=" Object.keys(saleFiltered).length > 0">
          <div class=" col-4 q-pa-md  "	v-for="(sale, index) in saleFiltered "
		  
		   :key="index">
				<sale-body-component
					:sale="Object.assign({ id: index }, sale)"
					:saleId="index"
					@deletesale="removeSale"

				/>
			</div>
			</div>


			 <div class="row justify-left	" v-if=" Object.keys(saleFilteredDate).length > 0">
          <div class=" col-4 q-pa-md  "	v-for="(sale, index) in saleFilteredDate "
		  
		   :key="index">
				<sale-body-component
					:sale="Object.assign({ id: index }, sale)"
					:saleId="index"
					@deletesale="removeSale"

				/>
			</div>
			</div>
			
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
				'sales', 'saleFiltered', 'saleFilteredDate'
			]),
			...mapGetters('sale', [
				'filterSaleByTime',
			]),
			

            
			
			getTotalMoney() {

				let money = 0;
				Object.keys(this.sales ).forEach((element, key) => {
					let prod = this.sales[element].details.subtotal
					
					money =  money + prod

				});
				return money
			},

			getTotalFilteredMoney() {

				let money = 0;
				if(Object.keys(this.saleFiltered).length > 0) 
				Object.keys(this.saleFiltered).forEach((element, key) => {
					let prod = this.saleFiltered[element].details.subtotal
					
					money =  money + prod

				});
				return money
			},
            
            
			toggleDialog: {

				get() {
					return this.showSale;
				},
				set(val) {
					this.$emit('closeDialog');
				}
			},
			
			getFilterdValueByTime(value) {
					console.log(value)
			}
            
		},
		mounted() {
		},

		methods: {
			...mapActions('sale', [
				'deleteSale', 'setSalesearchKey','setSalesearchDate'
			
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
