<template>
	<div class="row">
		{{ getQuantity }}

		<div class="col-6 ">
			<q-select
				v-model="price"
				dense
				:options="['Grosso', 'Retalho']"
				label="Venda A"
				filled
			/>
		</div>

		<div class="col-6 q-px-md">
			<q-input v-model="qtd" type="number" dense filled outlined />
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
				price: 'Retalho'
			};
		},
		computed: {
			...mapGetters('checkedProduct', [
				'getCheckedProducts',
				'checkIncludes'
			]),
			...mapState('checkedProduct', ['checkedProducts']),

			getQuantity() {}
		},
		methods: {
			...mapActions('expo', ['updateQtdProduct'])
		},

		watch: {
			price(val) {
				if (val) {
					this.$emit('price', val);

					if (this.qtd > ~~this.product.quantity) {
						this.$q
							.dialog({
								title: 'Quantidade Inválida',
								message: `O Produto ${this.product.name}  somente possui  ${this.product.quantity} unidades no Armazêm. 
						Por favor, aumente o stock, depois volte a tentar.
						`,
								ok: 'Sim'
							})
							.onOk(() => {});
					} else if (this.qtd <= ~~this.product.quantity) {
						this.updateQtdProduct({
							id: this.id,
							updates: {
								newQtd: this.qtd,
								subtotal:
									this.price == 'Retalho'
										? this.product.price_buy * this.qtd
										: this.product.grosso * this.qtd
							}
						});
					}
				}
			},
			qtd(val) {
				if (val.length > 0) {
					if (val > ~~this.product.quantity) {
						this.$q
							.dialog({
								title: 'Quantidade Inválida',
								message: `O Produto ${this.product.name}  somente possui  ${this.product.quantity} unidades no Armazêm. 
						Por favor, aumente o stock, depois volte a tentar.
						`,
								ok: 'Sim'
							})
							.onOk(() => {});
					} else if (val <= ~~this.product.quantity) {
						this.updateQtdProduct({
							id: this.id,
							updates: {
								newQtd2: val,
								priceType : this.price == 'Retalho'
										? this.product.price_buy 
										: this.product.grosso ,
								subtotal:
									this.price == 'Retalho'
										? this.product.price_buy * val
										: this.product.grosso * val
							}
						});
					}
				}
			}
		}
	};
</script>
