<template>
	<tr >	
		<td class="text-left">{{ box.createdAt | dateFormat }}</td>
		<td class="text-left">{{ box.createdAt | timeFormat }}</td>
		<td class="text-left">{{ box.closedAt | timeFormat  }}</td>

		<td class="text-left ">
			{{box.beginValue   || 0 }} ,00 MT
		</td>
  
        <td class="text-left ">
			{{box.value}}, 00 MT
		</td>

		<td class="text-left ">
				{{box.createdBy.name}}
		</td>
       

		

		<td class="text-center ">
			<div class="row " style="width:100px;">
		
				<div class="col">
					<q-btn
						flat
						rounded
						size="sm"
						text-color="red"
						icon="delete"
						@click="$emit('deleteProduct',boxId)"
					/>
				</div>
			</div>
			
		</td>

	</tr>

</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'boxBodyComponent',
		props: ['box','boxId', 'count'],
		data() {
			return {
				dialog: false,
				
			};
		},
		computed: {
			
		},
		mounted() {
			// console.log(this.box)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('box', ['updatebox'])
		},
		filters: {
                timeFormat(val) {
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
					dateCreated.getHours() +
					'h' + ':' +
					dateCreated.getMinutes()
					
				);
			},


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
