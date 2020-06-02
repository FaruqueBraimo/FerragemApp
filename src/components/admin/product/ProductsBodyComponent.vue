<template>
	<tr>
		<td class="text-left">
			{{ product.name }}
		</td>
		<td class="text-left text-primary cursor-pointer"  >{{ product.category.label }}</td>
		<td class="text-left">{{ product.quantity }}</td>
 
		<td class="text-left">  <q-chip square size="sm" color="red-5" class="text-white" >
      {{ product.price ?  product.price  : 0   }} MZN
      </q-chip>
	  </td>


		<td class="text-left ">
			<span class="text-primary cursor-pointer 	" v-if="product.provider.label!='Nenhum'">{{product.provider.label  }}</span>
			<span class=" 	" v-else> Nenhum</span>

		</td>

		<td class="text-center ">
			{{ product.createdAt | dateFormat }}
		</td>

		<td class="text-center ">
			<div class="row " style="width:100px;">
				<div class="col text-center">
					<product-details-dialog :product="product"/>
				</div>
				<div class="col">
					<q-btn
						flat
						size="sm"
						rounded
						text-color="primary"
						icon="edit"
					/>
				</div>
				<div class="col">
					<q-btn
						flat
						rounded
						size="sm"
						text-color="red"
						icon="delete"
						@click="$emit('deleteProduct')"
					/>
				</div>
			</div>
		</td>
	</tr>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import ProductDetailsDialog from './ProductDetailsDialog';
	export default {
		name: 'productBodyComponent',
		props: ['product'],
		components:{ProductDetailsDialog},
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
