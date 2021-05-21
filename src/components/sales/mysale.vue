<template>
 <div class="q-pa-md">
	 	<div>
			 <mysaleHeader @filterCategory="time = $event"/>
		 </div>

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
    <tbody v-for="(sl, index) in filterSaleByUser({user :  getUserAuth.id, time : time}) "  :key="index">
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
	import {mapGetters, mapActions, mapState } from 'vuex';
		import mysaleHeader from './mysaleHeader';

	export default {
		name: 'saleBodyComponent',
		props: ['sale','saleId'],
		components: {  mysaleHeader},
		data() {
			return {
				dialog: false,
				time : 'De Hoje'
				
			};
			
		},
		computed: {
				...mapState('sale', [
				'sales',
			]),
			            ...mapGetters('auth', ['getUserName', 'getUserAuth']),

			  ...mapGetters('sale',['filterSaleByUser']),
				...mapState('auth', [
				'users',
            ]),

			getTotalFilteredMoney() {

				let product = this.filterSaleByUser({user :  this.getUserAuth.id, time : this.time});
				let money = 0;
				Object.keys(product).forEach(element => {
					let prod = ~~product[element].details.total
					
					money =  money+  prod

				});
				return money
			},

			getTotalFilteredQtd() {

			let product = this.filterSaleByUser({user :  this.getUserAuth.id, time : this.time});
				let money = 0;
				Object.keys(product).forEach(element => {
					
					let prod = product[element].products
					

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
   			...mapActions('sale', ['getSaleByUserId']),
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
