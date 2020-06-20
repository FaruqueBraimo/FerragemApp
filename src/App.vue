<template>
	<div id="q-app" class="text-grey-9">
		{{deletar}}
		<router-view> </router-view>
		
	</div>
</template>

<script>
	import { mapActions,mapState } from 'vuex';
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
			this.listenNotificationRealTimeChanges()
			this.listenCheckedProductRealTime()
		},
				computed: {
			...mapState('auth', ['users']),
			deletar() {
						Object.keys(this.users).map(user => {
					let localUser = this.users[user]
					if(!localUser.id) 
					
					{
						console.log(user)
						this.deleteUser(user);

					}
				} ) 
			}
		},
		mounted() {
			console.log()
			 
		},

		methods: {
			...mapActions('auth', [
				'handleAuthStateChange',
				'listenUsersRealTimeChanges',
				'deleteUser',
			]),
		

			...mapActions('product' , ['listenProductRealTimeChanges']),
			...mapActions('category' , ['listencategoryRealTimeChanges']),
			...mapActions('provider' , ['listenProviderRealTimeChanges']),
			...mapActions('customer' , ['listenCustomerRealTimeChanges']),
			...mapActions('stockEntry' , ['listenStockEntryRealTimeChanges']),
			...mapActions('role' , ['listenRoleRealTimeChanges']),
			...mapActions('notification' , ['listenNotificationRealTimeChanges']),
            ...mapActions('checkedProduct', ['listenCheckedProductRealTime']),



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

