<template>
  <q-page  padding>

        <div class="row justify-center"> 
                <div class=" col-4"  v-for="box in boxs" :key="box.by">
            <q-card class="my-card q-pa-md q-ma-md"  >
                
                    <q-card-section>
                        <div class="text-h6">Valor :  {{box.amount}}</div>
                        <div class="text-subtitle2">Retirado por {{users[box.by].name}}</div>
                    </q-card-section>
                    <q-card-section>
                    <div class="text-subtitle2">Justificativa</div>
    
                    {{box.justification}}
                    </q-card-section>
                </q-card>
                </div>
        </div>
       
  </q-page>


</template>
<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import { date } from 'quasar';

export default {

        name: 'Retirada',
        props: [''],

		data() {
			return {
				maximizedToggle: true,
				search: '',

				options: []
			};
		},
		computed: {
			...mapState('retirada', [
				'boxs',
			]),
            	...mapGetters('auth', ['getUserName', 'getUserAuth']),
                ...mapState('auth', ['users']),
			
        getTotalMoney() {

				// let money = 0;
				// Object.keys(this.invoices).forEach((element) => {
				
				// 	if(! this.invoices[element].details.status) {
				// 			money +=   this.invoices[element].details.total
				// 	      console.log( this.invoices[element].details.total)
				// 	} 					

				// });
				// return money
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
