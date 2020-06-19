<template>
	<div > 
        	
		<q-item clickable v-ripple>
			<q-item-section avatar top>
				<q-avatar icon="perm_identity" text-color="primary" />
			</q-item-section>

			<q-item-section>
				<q-item-label class="text-subtitle1">{{
					product.name || 'Sem productos'
				}}</q-item-label>
			</q-item-section>
		</q-item>
        <q-separator class="q-mb-md" />

	</div>
</template>

<script>
	export default {
		name: 'categoryDetailsDialog',
		props: ['product'],
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
