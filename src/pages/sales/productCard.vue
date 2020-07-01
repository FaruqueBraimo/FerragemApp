<template>
	<q-page  class=''>
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
		<q-card class="my-card q-mt-lg q-mb-xs  bg-green-11 q-mx-md" flat bordered square>
			<div class="row q-pa-sm text-deep-orange text-center"> 
			<div class="col"> Subtotal : </div>
			<div class="col text-center">   -------- </div>
			<div class="col text-right q-pr-md"> {{getSubTotal}} ,00 MT </div>	
		</div>
		</q-card>


		<div class="q-pa-sm row">
			<div class="col-12">
	         <q-btn
					color="primary"
					no-caps
					class="full-width q-pa-sm text-bold"
					unelevated
					icon="euro"
					label="Efetuar Venda"
					@click="$router.push('/sales/sale')"
				/>
			</div>
			
			</div>
			
			<div class="row q-pa-xs">
		
			<div class="q-pa-sm col-6">
				<q-btn
					color="blue-grey-10"
					no-caps
					class=" full-width"
					unelevated
					icon="receipt"
					label="Emitir Factura"
					@click="$router.push('/sales/invoice')"

				/>
			</div>

			<div class="q-pa-sm  col-6">
				<q-btn
					color="teal"
					no-caps
					class=" full-width"
					unelevated
					icon="book"
					label="Emitir Cotação"
					@click="$router.push('/sales/price')"

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
			if(this.checkedProducts.length===0) {
		      this.$router.push('/sales/products')			
			}
			else{
				console.log('nop')
			}
		},
		destroyed() {
			this.setPageTitle('');
		}
	};
</script>q

<style></style>
