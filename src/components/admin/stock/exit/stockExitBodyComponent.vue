<template>
	<tr >

		<td class="text-left">
			{{ stock.product.label }}
		</td>
		
		<td class="text-center">{{ stock.quantity }}</td>


		
		<td class="text-center ">
			{{ stock.createdAt | dateFormat }}
		</td>

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
				
			};
		},
		computed: {
			
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
