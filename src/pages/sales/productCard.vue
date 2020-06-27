<template>
	<q-page padding>
		

		<q-list>
			<q-scroll-area
				:thumb-style="thumbStyle"
				:bar-style="barStyle"
				style="height: 380px; "
			>
				<div
					v-for="(product, index) in checkedProducts"
					:key="index"
					class="q-pa-xs"
				>
					<product-card-component
						:product="Object.assign({ id: index }, product)"
						:productId="index"
						@addToCard="addToCard"
						@removeChecked="removeChecked"
					/>
				</div>
			</q-scroll-area>
		</q-list>
		<q-card class="my-card bg-green-11 q-mx-md" flat bordered square>
			<div class="row q-pa-md text-green-8 text-center"> 
			<div class="col"> Subtotal : </div>
			<div class="col text-center">   -------- </div>
			<div class="col text-right q-pr-md"> {{getSubTotal}} ,00 MT </div>	
		</div>
		</q-card>
		
		<div class="row q-pa-lg">
		<div class="q-pa-sm col">
				<q-btn
					color="primary"
					no-caps
					class=" full-width"
					unelevated
					icon="euro"
					label="Efetuar Venda"
					@click="$router.push('/sales/sale')"
				/>
			</div>

			<div class="q-pa-sm col">
				<q-btn
					color="deep-orange"
					no-caps
					class=" full-width"
					unelevated
					icon="book"
					label="Emitir Factura"
				/>
			</div>
		</div>
	</q-page>
</template>

<script>
	import ProductCardComponent from '../../components/sales/products/ProductCardComponent';
		import addQuantity from '../../components/sales/products/addQuantity';

	import { mapActions, mapState, mapGetters } from 'vuex';

	export default {
		data() {
			return {
				search: '',
				productChecked: {},
				thumbStyle: {
					right: '4px',
					borderRadius: '5px',
					backgroundColor: '#027be3',
					width: '5px',
					opacity: 0.75
				},

				barStyle: {
					right: '2px',
					borderRadius: '9px',
					backgroundColor: '#027be3',
					width: '9px',
					opacity: 0.2
				}
			};
		},
		computed: {
			...mapState('product', ['products', 'checkedProducts']),
			...mapGetters('checkedProduct', ['getSubTotal']),
			...mapState('checkedProduct', ['checkedProducts'])
		},
		components: {
			ProductCardComponent
		},
		methods: {
			...mapActions('setting', ['setPageTitle']),
			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
				'updateCheckedProducts'
			]),

			addToCard(product) {
				this.addCheckedProducts(product);
			}
		},
		mounted() {
			this.setPageTitle('Carinha ');
		},
		destroyed() {
			this.setPageTitle('');
		}
	};
</script>

<style></style>
