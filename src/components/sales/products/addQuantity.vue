<template>
	<div class="row">
		{{ getPriceType }} 

		<div class="col-6 ">
			<q-select
				v-model="price"
				dense
				:options="OptionalPrices"
				label="Venda a"
				filled
			/>
		</div>

		<div class="col-6 q-px-md">
			<q-input v-model="qtd" type="number" min='1' dense filled outlined />
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';

	export default {
		props: ['quantity', 'product', 'id'],
		data() {
			return {
				qtd: 1,
				price: '',
				OptionalPrices: []
			};
		},
		computed: {
			...mapGetters('checkedProduct', [
				'getCheckedProducts',
				'checkIncludes'
			]),
			...mapState('checkedProduct', ['checkedProducts']),

			getPriceType() {
					
					this.OptionalPrices.push({
						value: this.product.price_buy,
						label: "Retalho"
					});

					
					this.OptionalPrices.push({
						value: this.product.grosso,
						label: "Grosso"
					});

			}



		},
		methods: {
			...mapActions('expo', ['updateQtdProduct'])
		},

		watch: {
			price(val) {
				if (val) {
					this.$emit('price', val);

					if (this.qtd > this.product.quantity) {
						this.$q
							.dialog({
								title: 'Quantidade Inválida',
								message: `O Produto ${this.product.name}  somente possui  ${this.product.quantity} unidades no Armazêm. 
						Por favor, aumente o stock, depois volte a tentar.
						`,
								ok: 'Sim'
							})
							.onOk(() => {});
					} else if (this.qtd <= this.product.quantity) {
						this.updateQtdProduct({
							id: this.id,
							updates: {
								newQtd: this.qtd,
								priceType :	this.price.label == 'Retalho'
										? this.price.value
										: this.price.value  ,
								subtotal:
									this.price.label == 'Retalho'
										? this.price.value * this.qtd
										: this.price.value * this.qtd
							}
						});
					}
				}
			},
			qtd(val) {
				if (val) {
					if (this.qtd > this.product.quantity) {
						this.$q
							.dialog({
								title: 'Quantidade Inválida',
								message: `O Produto ${this.product.name}  somente possui  ${this.product.quantity} unidades no Armazêm. 
						Por favor, aumente o stock, depois volte a tentar.
						`,
								ok: 'Sim'
							})
							.onOk(() => {});
					} else if (this.qtd <= this.product.quantity) {
						this.updateQtdProduct({
							id: this.id,
							updates: {
								newQtd: this.qtd,
								priceType :	this.price.label == 'Retalho'
										? this.price.value
										: this.price.value  ,
								subtotal:
									this.price.label == 'Retalho'
										? this.price.value * this.qtd
										: this.price.value * this.qtd
							}
						});

					}
				}
			
		}}
	};
</script>
