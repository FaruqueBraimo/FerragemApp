<template>
	<q-page class="q-pa-xl">
		<product-form-component @emitData="addProduct" />
	</q-page>
</template>

<script>
	import { mapActions } from 'vuex';
	import ProductFormComponent from '../../components/form/ProductFormComponent.vue';
	export default {
		components: { ProductFormComponent },
		methods: {
			...mapActions('product', ['addProduct'])
		}
	};
	
</script>

<style></style>
