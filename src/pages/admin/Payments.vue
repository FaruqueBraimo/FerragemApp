


<template>
<q-page class="q-pa-md">

<div class="row q-pa-lg">
    <div class="col text-right text-h6 text-green-5 q-px-xl">
           Dinheiro Recebido : {{ new Intl.NumberFormat().format( getTotalMoney ) }}  MT
    </div>

</div>
<div class="q-px-xl">
    <q-list bordered v-for="(invoice, index) in invoices" :key="index"  class="q-mx-lg q-my-md" >

    <q-item clickable v-ripple>

       
        <q-item-section> No dia {{ invoice.updatedAt |dateFormat}}, o cliente  {{invoice.details.client.label }}  efectou o pagamento da factura no valor de   {{new Intl.NumberFormat().format(invoice.details.total) }} MT  e foi confirmado por {{invoice.details.confirmad || ''}} </q-item-section> 
    </q-item>
</q-list>   

</div>
 
</q-page>

</template>
<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import { date } from 'quasar';

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
				Object.keys(this.invoices).forEach((element) => {
				
					if(! this.invoices[element].details.status) {
							money +=   this.invoices[element].details.total
					      console.log( this.invoices[element].details.total)
					} 					

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
			 
		},

	
		filters: {
			dateFormat(val) {
				var months = [
					'Janeiro',
					'Fevereiro',
					'Março',
					'Abril',
					'Maio',
					'Junho',
					'Julho',
					'Agosto',
					'Setembro',
					'Outubro',
					'Novembro',
					'Dezembro'
				];
				let dateCreated = new Date(val.seconds * 1000);
				return (
					dateCreated.getDate() +
					' de ' +
					months[dateCreated.getMonth()] +
					' de ' +
					dateCreated.getFullYear()
				);
			
		}
		}
	};
</script>
