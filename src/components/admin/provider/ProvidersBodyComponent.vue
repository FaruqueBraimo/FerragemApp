<template>
	<tr>
		<td class="text-left">
			{{ provider.name }}
		</td>
		<td class="text-left">{{ provider.type }}</td>

		<td class="text-left">{{ provider.address }}</td>

		<td class="text-center ">
			{{ provider.createdAt | dateFormat }}
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
				@click="$emit('deleteprovider')"
			/>
		</td>
	</tr>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'providerBodyComponent',
		props: ['provider'],
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
			providerRoleName() {
				return this.provider.role ? this.provider.role : 'Outro';
			}
		},
		mounted() {
			// console.log(this.provider)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('auth', ['updateprovider'])
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
