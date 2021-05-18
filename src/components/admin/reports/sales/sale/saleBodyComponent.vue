<template>
 <div class="q-pa-md">


    <q-markup-table class="q-pa-md" bordered square id="table">
      <thead class="bg-teal text-white"> 
        <tr>
          <th class="text-left">Artigo</th>
          <th class="text-right">Quantidade</th>
          <th class="text-right">Preço</th>
	     <th class="text-right">Subtotal</th>
          <th class="text-right">Balconista</th>
          <th class="text-right">Data de  Venda</th>
        </tr>
      </thead >
    <tbody v-for="(sl, index) in sale "  :key="index">
        <tr  v-for="i in sl.products" :key="i"  >
          <td class="text-left">{{ i.name }}</td>
          <td class="text-right">{{ i.newQtd }}</td>
          <td class="text-right">{{ 	new Intl.NumberFormat().format(i.price_buy )}}</td>
		    <td class="text-right">{{	new Intl.NumberFormat().format(  i.price_buy* i.newQtd)  }}</td>
          <td class="text-right">{{  users[sl.details.salesMan].name || ''  }}</td>
          <td class="text-right">{{  sl.createdAt  | dateFormat  }}</td>
        </tr>
		
      </tbody> 
	  <tbody class="bg-teal text-white">
		  <tr>
			<td class="text-bold">Subtotais</td>
							<td class="text-right text-bold"> {{getTotalFilteredQtd}}</td>

				<td class="text-bold"></td>

				<td class="text-right text-bold"> {{	new Intl.NumberFormat().format(getTotalFilteredMoney)}} MT</td>
				<td class="text-bold"></td>
					<td class="text-bold"></td>
				

		</tr>
	  </tbody>
    </q-markup-table>
		<q-btn color="primary" class="q-ma-md " unelevated  icon="book" label="Imprimir" @click="onClick" />

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'saleBodyComponent',
		props: ['sale','saleId'],
		components: {  },
		data() {
			return {
				dialog: false,
				
			};
		},
		computed: {
				...mapState('sale', [
				'sales',
			]),
			
				...mapState('auth', [
				'users',
            ]),

			getTotalFilteredMoney() {

				let money = 0;
				Object.keys(this.sale).forEach(element => {
					let prod = ~~this.sale[element].details.total
					
					money =  money+  prod

				});
				return money
			},

			getTotalFilteredQtd() {

				let money = 0;
				Object.keys(this.sale).forEach(element => {
					let prod = this.sale[element].products
					

						Object.keys(prod).forEach(key => {
					let prod2 = prod[key]	
										money = money + ~~prod2.newQtd;
	
					});

				});
				return money
			},
		},
		mounted() {
			// console.log(this.sale)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('sale', ['updatesale']),

			onClick() {
				this.$htmlToPaper('table');
			}
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

<style scoped>
	.active-class {
		background: rgb(240, 240, 240);
	}
</style>
