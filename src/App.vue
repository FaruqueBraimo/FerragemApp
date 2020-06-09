<template>
	<div id="q-app" class="text-grey-9">
		<router-view> </router-view>
		
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name: 'App',
		created() {
			this.listenUsersRealTimeChanges();
			this.listenProductRealTimeChanges();
			this.listencategoryRealTimeChanges();
			this.listenProviderRealTimeChanges();
			this.listenCustomerRealTimeChanges();
			this.listenStockEntryRealTimeChanges();
			this.listenRoleRealTimeChanges();
		},
		methods: {
			...mapActions('auth', [
				'handleAuthStateChange',
				'listenUsersRealTimeChanges',
				'listenProductRealTimeChanges',
			]),

			...mapActions('product' , ['listenProductRealTimeChanges']),
			...mapActions('category' , ['listencategoryRealTimeChanges']),
			...mapActions('provider' , ['listenProviderRealTimeChanges']),
			...mapActions('customer' , ['listenCustomerRealTimeChanges']),
			...mapActions('stockEntry' , ['listenStockEntryRealTimeChanges']),
			...mapActions('role' , ['listenRoleRealTimeChanges']),


		},
		beforeDestroy() {
			this.$q.loading.hide();
		}
	};
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@550&display=swap');

#q-app{
font-family: 'Dosis', sans-serif;


}

</style>

