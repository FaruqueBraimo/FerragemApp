<template>
	<q-dialog
		v-model="toggleDialog"
		
		
    :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
	>
	
    <q-card >
			<q-card-section class="row items-center">
				<div class="text-h6 text-left col " > Relatorios de cotações geradas </div>

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
			<price-header-component
				class="q-pa-sm"
				@priceFilter="filterprice"
				@priceFilterCategory="priceFilterCategory"
			/>
                </q-markup-table>		
		
		
            <div class="row justify-left	">
          <div class=" col-4 q-pa-md  "	v-for="(price, index) in prices" :key="index">
				<price-body-component
					:price="Object.assign({ id: index }, price)"
					:priceId="index"
					@deleteprice="removeInvoice"
				/>
				</div>
			</div>
		
			
		
			
			</q-card-section>
		</q-card>
		
	
	</q-dialog>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import priceBodyComponent from './priceBodyComponent';
	import priceHeaderComponent from './priceHeaderComponent';

	export default {

        name: 'pricesReportComponent',
        props: ['showPrice'],

		data() {
			return {
				maximizedToggle: true,
				search: '',

				options: []
			};
		},
		computed: {
			...mapState('price', [
				'prices',
			]),
			
        getTotalMoney() {

				let money = 0;
				Object.keys(this.prices).forEach((element, key) => {
					let prod = this.prices[element].details.subtotal
					
					money =  money + prod

				});
				return money
			},
            
			toggleDialog: {

				get() {
					return this.showPrice;
				},
				set(val) {
					this.$emit('closeDialog');
				}
            },
            
		},
		mounted() {
		},

		methods: {
			...mapActions('price', [
				'deletePrice',
			]),
		

			removeInvoice(id) {
				this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar esta cotação ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
						this.deletePrice(id);
					});
			},
			closeDialog() {
				this.dialog = false;
				this.updateCategory = false;
			},
			filterprice(query) {
				this.filterDatafromDb(query);
			},
			priceFilterCategory(query) {
				this.filterCategoryDatafromDb(query);
			}
		},
		components: {
			priceHeaderComponent,
			priceBodyComponent,
		
		},

		watch: {
			search(val) {}
		}
	};
</script>
