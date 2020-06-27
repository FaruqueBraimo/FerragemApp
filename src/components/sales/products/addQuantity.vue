<template>
	<div class="">
        {{getQuantity}}
		<q-input v-model="text" type="text"  dense filled outlined   />
       
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
                this.text =this.quantity
            }
		},

		methods: {
			addToCard(product) {
				this.$emit('addToCard', product);
			},
			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
				'incrementQuantity',
                'decrementQuantity',
                'addQuantity',
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


        },

         watch: {
            text(val) {
                	this.addQuantity(
                        
						{quantity : this.text, updates : this.product }
					) 

            }
        }
       
	};
</script>
