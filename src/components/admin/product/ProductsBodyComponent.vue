<template>
	<tr>
		<td class="text-left">
			{{ product.name }}
		</td>
		<td class="text-left">{{ product.price }}</td>
		<td class="text-left">11</td>

		<td class="text-left">{{ product.quantity }}</td>

		<td class="text-left ">
			<span class="text-primary cursor-pointer	">Jose Guera</span>
		</td>

		<td class="text-center ">
			{{ product.createdAt | dateFormat }}
		</td>

		<td class="text-center ">
			<q-btn
				flat
				size="sm"
				rounded
				text-color="secondary"
				icon="visibility"
			/>
			<q-btn flat size="sm" rounded text-color="primary" icon="edit" />

			<q-btn
				flat
				rounded
				size="sm"
				text-color="red"
				icon="delete"
				@click="$emit('deleteproduct')"
			/>
		</td>
	</tr>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'productBodyComponent',
		props: ['product'],
		data() {
			return {
				role: null,
				options: [
					'Administrador',
					'Acesso somente aos Produtos e Categorias',
					'Acesso aos Clientes e Fornecedores',
					'Acesso a gestão de Stock',
					'Nenhum Acesso'
				]
			};
		},
		computed: {
			productRoleName() {
				return this.product.role ? this.product.role : 'Outro';
			}
		},
		mounted() {
			// console.log(this.product)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('product', ['updateproduct'])
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
