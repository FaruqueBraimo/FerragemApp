<template>
	<tr >

		<td class="text-center">
			{{ sale[0].payload.name }}
		</td>
		
		<td class="text-left">{{ sale[0].payload.qtdUnit }}</td>

            <td class="text-left ">
			{{ sale[0].payload.price }} , 00 MT
		</td>

		<td class="text-left ">
			{{ sale.salesMan.name || 'Desconhecido' }} 
		</td>

        	

        	
        <td class="text-center ">
			{{ sale.updatedAt | dateFormat }} 
		</td>

        	
    


		
		<!-- <td class="text-center ">
			{{ sale[0].createdAt }}
		</td>  -->

       

		<td class="  ">
		
					

				<div class="col">
					<q-btn
						flat
						rounded
						size="sm"
						text-color="red"
						icon="delete"
						
						@click="$emit('deletesale',saleId)"
					/>
				</div>
			
			
		</td>

	</tr>

</template>

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
		},
		mounted() {
			// console.log(this.sale)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('sale', ['updatesale'])
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
