<template>
	<q-page padding>
		

		<q-list>
			<q-scroll-area
				:thumb-style="thumbStyle"
				:bar-style="barStyle"
				style="height: 400px; "
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
		<div class="row q-pa-xs">
		<div class="q-pa-sm col">
				<q-btn
					color="primary"
					no-caps
					class=" full-width"
					unelevated
					icon="euro"
					label="Efetuar Venda"
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
			...mapGetters('checkedProduct', ['getCheckedProducts']),
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
