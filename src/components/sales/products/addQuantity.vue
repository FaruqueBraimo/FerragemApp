<template>
	<div class="">
        {{getQuantity}} 
		<q-input v-model="qtd" type="number"   dense filled outlined   />
       
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	
	export default {
		props: ['quantity', 'product' , 'id'],
		data() {
			return {
				qtd: 1
			};
		},
		computed: {
			...mapGetters('checkedProduct', [
				'getCheckedProducts',
				'checkIncludes'
			]),
            ...mapState('checkedProduct', ['checkedProducts']),
            
            getQuantity(){
            }
		},
		methods: {
			
			...mapActions('expo', [
				'updateQtdProduct',
				
			]),
        },

         watch: {
            qtd(val) {

				if (val.length > 0 )  {

			

		if ( val >  ~~this.product.quantitySell) {

					this.$q
					.dialog({
						title: 'Quantidade Inválida',
						message: `O Produto ${this.product.name}  somente possui  ${this.product.quantitySell} unidades no Armazêm. 
						Por favor, aumente o stock, depois volte a tentar.
						`,
						ok: 'Sim',
					})
					.onOk(() => {
					});
				} else  if (val <=  ~~this.product.quantitySell ){
					
					this.updateQtdProduct(
                        
						{ id : this.id, updates : {newQtd : val , subtotal : this.product.price_buy*val }  }
					)

					
				}
				
                	 

            }		
        }
       	}	
	};
</script>
