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
						 {{ product.name }}
					</div>
					
					<div class="col justify-end  text-right">
                      <q-btn
						color="red-5"
						size="xs"
						icon="close"
						unelevated
						@click="$emit('removeChecked', product.id)"
						round
						
					/>
						
					</div>
				</div>


                </q-item-label>
				<q-item-label class="text-bold text-grey-7">
					{{ product.price_buy }} MT</q-item-label
				>

				<div class="row q-pt-sm">
					<div class="col ">
						<q-btn
							color="red"
							size="sm"
							flat
                            class='text-bold'
							outline
							icon="remove"
						/>
					</div>
					<div class="col text-center">1</div>
					<div class="col   text-right">
                        <q-btn
							color="primary"
							size="sm"
							flat
							outline
							icon="add"
						/>
						
					</div>
				</div>
			</q-item-section>

			<!-- <q-item-section side top>
				


			</q-item-section> -->
		</q-item>
		<q-separator spaced inset="item" />
		<div></div>
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
			...mapState('checkedProduct', ['checkedProducts'])
		},

		methods: {
			addToCard(product) {
				this.$emit('addToCard', product);
			}
		}
	};
</script>
