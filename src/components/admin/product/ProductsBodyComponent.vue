<template>
	<tr >

		<td class="text-center" @click="dialog=!dialog">
			<img
				src="https://img.icons8.com/material-rounded/24/000000/barcode.png"
				
			/>
			<p class="text-caption"> KM-- {{product.code}} </p>
		
			<bar-code-component
			:value='productId' 
			:dialog='dialog'
			/>
			<q-tooltip 	content-class="bg-secondary text-white shadow-4 text-caption"  :offset="[10, 10]">
				clica para ver o codigo de bara
			</q-tooltip>
		</td>
		<td class="text-left">
			{{ product.name }}
		</td>
		<td class="text-left text-primary cursor-pointer">
			{{ product.category.label }}
		</td>
		<td class="text-left">{{ product.qtdWarehouse }}</td>

		<td class="text-left">
			<q-chip square size="sm" color="teal" class="text-white">
				{{ product.price_buy ? product.price_buy : 0 }} MZN
			</q-chip>
		</td>

		<td class="text-left ">
			<span
				class="text-primary cursor-pointer 	"
				v-if="product.provider.label != 'Nenhum'"
				>{{ product.provider.label }}</span
			>
			<span class=" 	" v-else> Nenhum</span>
		</td>

		<td class="text-center ">
			{{ product.createdAt | dateFormat }}
		</td>

		<td class="text-center ">
			<div class="row " style="width:100px;">
					<div class="col">
					<q-btn
						flat
						size="sm"
						rounded
						text-color="teal"
						icon="info"
						@click="$router.push('/products/' + productId)"
					/>
				</div>

				<div class="col">
					<q-btn
						flat
						size="sm"
						rounded
						text-color="primary"
						icon="edit"
						@click="$router.push('/products/add/' + productId)"
					/>
				</div>

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
	import ProductDetailsDialog from './ProductDetailsDialog';
	import barCodeComponent from './barCodeComponent'
	export default {
		name: 'productBodyComponent',
		props: ['product','productId'],
		components: { ProductDetailsDialog,barCodeComponent },
		data() {
			return {
				dialog: false,
				
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
