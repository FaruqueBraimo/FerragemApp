<template>
	<div class="">
        {{getQuantity}}
		<q-input v-model="text" type="number" min='1'   dense filled outlined   />
       
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	
	export default {
		props: ['quantity', 'product' , 'id'],
		data() {
			return {
				text: 1
			};
		},
		computed: {
			...mapGetters('checkedProduct', [
				'getCheckedProducts',
				'checkIncludes'
			]),
            ...mapState('checkedProduct', ['checkedProducts']),
            
            getQuantity(){
                this.text = this.quantity
            }
		},
		methods: {
			
			...mapActions('product', [
				'updateQtdProduct',
				
			]),
        },

         watch: {
            text(val) {
				if ( this.text >  ~~this.product.quantity) {

					this.$q
					.dialog({
						title: 'Quantidade Inválida',
						message: `O Produto ${this.product.name}  somente possui  ${this.product.quantity} unidades no Armazêm. 
						Por favor, aumente o stock, depois volte a tentar.
						`,
						ok: 'Sim',
					})
					.onOk(() => {
					});
				} else  if (this.text <=  ~~this.product.quantity ){
					
					this.updateQtdProduct(
                        
						{ id : this.id, updates : {newQtd : this.text, subtotal : this.product.price_buy*this.text }  }
					)
					
				}
				
                	 

            }
        }
       
	};
</script>
