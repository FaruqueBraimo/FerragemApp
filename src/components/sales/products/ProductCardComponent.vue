<template>
	<div class="q-pa-sm">
		<q-item>
			<q-item-section avatar>
				<q-avatar size="50px" square>
					<img
						src="https://img.icons8.com/color/48/000000/shopping-basket-2.png"
					/>
				</q-avatar>
			</q-item-section>
			<q-item-section>
				<q-item-label>
                   

                    <div class="row q-pt-sm">
					<div class="col ">
						 {{ product.payload.name }}
					</div>
					
					<div class="col justify-end  text-right">
                      <q-btn
						color="red-5"
						size="xs"
						icon="close"
						unelevated
						@click="$emit('removeChecked', product.payload.id)"
						round
						
					/>
						
					</div>
				</div>


                </q-item-label>
				<q-item-label class="text-bold text-grey-7">
					{{ product.payload.price }} MT</q-item-label
				>

				<div class="row q-pt-sm">
					<div class="col q-pt-sm ">
						<q-btn
							color="red"
							size="sm"
							flat
                            class='text-bold'
							outline
							v-if="product.payload.qtdUnit >= 1"
							icon="remove"
							@click="LocalDecrementQuantity(product.payload)"
						/>
					</div>
					
					<div class="col text-center"> <addQuantity :quantity='product.payload.qtdUnit' :product='product.payload'  :id="product.payload.id"/></div>
					<div class="col  q-pt-sm text-right">
                        <q-btn
							color="primary"
							size="sm"
							flat
							outline
							icon="add"
							@click="LocalIncrementQuantity(product.payload)"
						/>
						
					</div>
				</div>
			</q-item-section>

		</q-item>
		<q-separator spaced inset="item" />
		<div></div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
		import addQuantity from './addQuantity';

	export default {
		props: ['product', 'productChecked'],
		data() {
			return {
				search: ''
			};
		},
		computed: {
			...mapGetters('checkedProduct', [
				'getCheckedProducts',
				'checkIncludes'
			]),
			...mapState('checkedProduct', ['checkedProducts'])
		},
		components:{
			addQuantity
		},

		methods: {
			addToCard(product) {
				this.$emit('addToCard', product);
			},
			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
				'incrementQuantity',
				'decrementQuantity'
			]),

			LocalIncrementQuantity(val) {
					let product = val
					// 
					

					this.incrementQuantity(
						{id : val.id, updates : product }
					) 
			},

			LocalDecrementQuantity(val) {
					let product = val
					// 

					this.decrementQuantity(
						{id : val.id, updates : product }
					) 
			}


		}
	};
</script>
