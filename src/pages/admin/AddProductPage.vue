<template>
	<q-page class="q-pa-xl">
		<product-form-component @emitData="addProduct" :productData='productData' />
	</q-page>
</template>

<script>
	import { mapActions,mapState } from 'vuex';
	import ProductFormComponent from '../../components/form/ProductFormComponent.vue';
	export default {
		components: { ProductFormComponent },

			computed: {
				...mapState('product', ['products']),
				productId(){
					let	id = this.$route.params.id
					return id
				},
				productData() {
					let product = {id : this.productId , data : this.products[this.productId] }
					
					return   product
				}
			},		

		methods: {
			...mapActions('product', ['addProduct']),
			...mapState('product', ['products'])

		}
	};
	
</script>

<style></style>
