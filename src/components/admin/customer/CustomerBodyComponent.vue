<template>
	<tr>
			<td class="text-left">
			{{ customer.count + 1 }}
		</td>
		<td class="text-left">
			{{ customer.name | limitLength(25) }}
		</td>
		<td class="text-left">{{ customer.address || 'Não Informado' | limitLength(17)}}</td>
		<td class="text-left">{{ customer.phone || 'Não Informado' }}</td>
		
		<td class="text-left ">
			<div class="row " style="width:100px;">
				<div class="col text-left">
					<customer-details-dialog :customer="customer"/>
				</div>
				<div class="col">
					<q-btn
						flat
						size="sm"
						rounded
						text-color="primary"
						icon="edit"
						@click="$emit('updateObject', customer)"

					/>
				</div>
				<div class="col">
					<q-btn
						flat
						rounded
						size="sm"
						text-color="red"
						icon="delete"
						@click="$emit('deleteCustomer',customer.id)"
					/>
				</div>
			</div>
		</td>
	</tr>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import CustomerDetailsDialog from './CustomerDetailsDialog';
	export default {
		name: 'CustomerBodyComponent',
		props: ['customer'],
		components: { CustomerDetailsDialog },
		data() {
			return {
				dialog: false,
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
				return this.customer.role ? this.customer.role : 'Outro';
			}
		},
		mounted() {
			// console.log(this.customer)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('customer', ['updateCustomer'])
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
