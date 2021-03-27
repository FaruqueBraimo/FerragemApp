<template>
	<tr >
		
		 <td class="text-left text-capitalize	">
			{{ product.code }}
		</td>
		<td class="text-left text-primary cursor-pointer">
			{{ product.name }}
		</td>
		<td class="">{{ product.quantity || 0 }}</td>

 		<td class="">{{ product.user.label  }}</td>

	

	

		<td class="text-center ">
			<div class="row q-pr-md" style="width:100px;">
					

				<div class="col">
					<q-btn
						flat
						rounded
						size="sm"
						text-color="red"
						icon="delete"
						@click="$emit('deleteProduct',productId)"
					/>
				</div>
			</div>
			
		</td>

	</tr>

</template>

<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'productBodyComponent',
		props: ['product','productId','posiction'],
		data() {
			return {
				open: false,
				
			};
		},
		computed: {
			
		},
		mounted() {
			// console.log(this.product)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('product', ['updateproduct'])
		},
		filters: {
				 limitLength (val, length) {
                return val.length > length ? val.substr(0, length) + '...' : val
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
