<template>
	<tr >

		<td class="text-left">
<div class="q-pa-md" >

    <q-expansion-item
      v-model="expanded"
      icon="perm_identity"
      label="Lista de Produtos Exportados"
      caption="Toque Para ver"
    >
	<div class="row q-pa-sm  ">
				<div class="col text-bold text-green-7">Produto</div>

				<div class="col  text-bold text-green-7  q-pr-md">
					Quantidade
				</div>

				<div class="col  text-bold text-green-7  q-pr-md">
				subtotal
				</div>
			</div>




      <q-card v-for="(product , key) in stock.products" :key="key">
        <q-card-section >  

			  	<div class="row ">
					<div class="col "> {{product.name}} </div>

					<div class="col  q-pr-md">
						 {{product.newQtd}}
					</div>

					<div class="col  q-pr-md">
					{{product.subtotal}},00 MT
					</div>
				</div>

        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
		</td>

		<td> {{sumTotals.sumMoney}}</td>
		
	


		
		<td class="text-center ">
			{{ stock.createdAt | dateFormat }}
		</td>

			<td class="text-center">{{ stock.statusDelivery }}</td>

		<td class=" text-center ">
			<div class="row justify-center items-center" style="width:100px;">
					

				<div class="col">
					<q-btn
						flat
						size="sm"
						rounded
						
						text-color="primary"
						icon="edit"
						@click="$emit('updateObject', stock)"

					
					/>
				</div>

				<div class="col">
					<q-btn
						flat
						rounded
						size="sm"
						text-color="red"
						icon="delete"
						
						@click="$emit('deletestock',stockId)"
					/>
				</div>
			</div>
			
		</td>

	</tr>

</template>

<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'stockBodyComponent',
		props: ['stock','stockId'],
		components: {  },
		data() {
			return {
				dialog: false,
				  expanded: false
				
			};
		},
		computed: {

				sumTotals() {
					let totals = {}
					let sumMoney = 0
				

				Object.keys(this.stock.products).forEach((element, key) => {

				
					let product = this.stock.products[element]
						sumMoney = sumMoney + product.subtotal;

						totals.sumMoney = sumMoney;
					


					
				});

				return totals
			},
			
		},
		mounted() {
			// console.log(this.stock)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('stock', ['updatestock'])
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
