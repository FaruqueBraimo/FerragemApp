<template>

<div>
	
		
	<div class="q-pa-sm" >
		<q-item > 
			<q-item-section avatar>
				<q-avatar size="50px" square>
					<img
						src="https://img.icons8.com/color/48/000000/shopping-basket-2.png"
					/>
				</q-avatar>
			</q-item-section>
			<q-item-section>
				<q-item-label class='text-capitalize'>{{ product.product.label }}</q-item-label>
				
				<q-item-label
					class="text-bold text-left text-primary text-overline "
					> qtd :{{ product.quantity || 0 }}</q-item-label
				>
			</q-item-section>

			<q-item-section side top>
				<small class="text-pink text-primary">
					{{ product.product.price }} MT
				</small>

				<q-space  />
				<!-- v-if="Object.keys(checkedProducts).length === 0" -->
				<div >
					<q-btn
						color="deep-purple"
						size="xs"
						outline
						icon="add"
						unelevated
						@click="addToCard(product)"
						round
					/>
				</div>
				<!-- <div v-else>
					<q-btn
						color="red-5"
						size="xs"
						icon="remove"
						v-if="checkIncludes(product.id )"
						unelevated
						@click="$emit('removeChecked', product.id)"
						round
					/>
					<q-btn
						color="deep-purple"
						size="xs"
						outline
						icon="add"
						v-else
						unelevated
						@click="addToCard(product)"
						round
					/>
				</div> -->
			</q-item-section>
		</q-item>
	</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';

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
			...mapState('checkedProduct', ['checkedProducts']),
		 ...mapState('product', ['products','checkedProducts','productFiltered']), 

		},


		

		methods: {
			addToCard(product) {
				this.$emit('addToCard', product);
			}
		}
	};
</script>
