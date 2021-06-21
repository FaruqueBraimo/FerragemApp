<template>
	<div>
		<q-item>
			<q-item-section avatar>
				<q-avatar size="50px" square>
					<img
						src="https://img.icons8.com/color/48/000000/shopping-basket-2.png"
					/>
				</q-avatar>
			</q-item-section>
			<q-item-section>
				<q-item-label class="text-body1">{{
					product.name
				}}</q-item-label>

				<q-item-label
					class="text-bold text-left text-overline text-primary"
				>
					quantidade Actual :{{ product.quantity || 0 }}</q-item-label
				>
			</q-item-section>

			<q-item-section side top>
				<small class="text-green-5">
					Preço a Retalho : {{ product.price_buy }} MT
				</small>

				<q-space />
				<!-- v-if="Object.keys(checkedProducts).length === 0" -->
				<div>
					<small class="text-pink-5">
						Preço a Grosso : {{ product.grosso }} MT
					</small>
				</div>
			</q-item-section>
		</q-item>
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
		...mapState('product', [
			'products',
			'checkedProducts',
			'productFiltered'
		])
	},

	methods: {
		addToCard(product) {
			this.$emit('addToCard', product);
		}
	}
};
</script>
