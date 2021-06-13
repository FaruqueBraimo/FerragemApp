<template>
	<div class="row">

			<div class="col-6">
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
			...mapState('expo', ['saleProduct', 'productToSale']),

		},
		methods: {
			...mapActions('expo', ['updateQtdProduct']),

			 addQuantity(){
				console.log(this.productToSale)
								
				}
				

			
		},

			updated( ) {
				console.log(this.productToSale)

			},
		watch: {
		
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

						this.$emit('updateQuantity' , {qtd : val , price: this.product.price_buy ,id : this.id })
						// this.updateQtdProduct({
						// 	id: this.id,
						// 	updates: {
						// 		newQtd: this.qtd,
						// 		priceType : this.product.price_buy ,
						// 		subtotal: this.product.price_buy * this.qtd
						// 	}
						// });

					}
				}
			
		}}
	};
</script>
