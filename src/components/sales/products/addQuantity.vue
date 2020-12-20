<template>
	<div class="">
        {{getQuantity}}
		<q-input v-model="text" type="text"   dense filled outlined   />
       
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
			
			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
				'incrementQuantity',
                'decrementQuantity',
                'addQuantity',
			]),



        },

         watch: {
            text(val) {
				if ( this.text >  ~~this.product.qtdBalcony) {

					this.$q
					.dialog({
						title: 'Quantidade Inválida',
						message: `O Produto ${this.product.name}  somente possui  ${this.product.qtdBalcony} unidades no balcão. 
						Por favor, contacte o administrador para aumento de quantidade.
						`,
						ok: 'Sim',
					})
					.onOk(() => {
					});
				} else {
					this.addQuantity(
                        
						{quantity : this.text, updates : this.product }
					)
					
				}
				
                	 

            }
        }
       
	};
</script>
