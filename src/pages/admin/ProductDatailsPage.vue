<template>
	<q-page class="q-pa-md">
		<product-details @emitData="addProduct" :product='productData' />
        
	</q-page>
</template>

<script>
	import { mapActions,mapState } from 'vuex';
    	import productDetails from '../../components/admin/product/productDetails';


	export default {
		components: { productDetails },
			computed: {
				...mapState('product', ['products']),
				productId(){
					let	id = this.$route.params.id
					return id
				},
				productData() {
					let product = this.products[this.productId  ] 
					
					return   product
				}
			},		
		methods: {
			...mapActions('product', ['addProduct']),
			...mapState('product', ['products'])
		}
	};
	
</script>