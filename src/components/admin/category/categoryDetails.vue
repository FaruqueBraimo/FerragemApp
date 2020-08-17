<template>
	<div > 
        	
		

		<q-item clickable  v-ripple @click="$router.push('/products/' +  productId)"> 
        <q-item-section class="text-bold text-body1">
         {{
					product.name || 'Sem productos'
				}}
        </q-item-section>

        <q-item-section side top>
				<q-btn color="primary" icon="info" rounded flat @click="$router.push('/products/' +  productId)"
 />
        </q-item-section>
      </q-item>

		
        <q-separator class="q-mb-md" />

	</div>
</template>

<script>
	export default {
		name: 'categoryDetailsDialog',
		props: ['product','productId'],
		data() {
			return {};
		}
	};
</script>

<style scoped>
	* {
		color: #585858;
	}
</style>
