<template>
	<div id="q-app" class="text-grey-9">
		{{deletar}}
		<router-view> </router-view>
		
	</div>
</template>

<script>
	import { mapActions,mapState,mapGetters } from 'vuex';

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
			this.listenCheckedProductRealTime();
			this.listenSaleRealTimeChanges();
			this.listeninvoiceRealTimeChanges()
			this.listenStockExitRealTimeChanges()
			this.listenBoxRealTimeChanges()
			this.listenPriceRealTimeChanges()
			this.getAllExpoProducts()
			this.findProductByName(this.getUserAuth.id)
			this.filterMyProducts(this.getUserAuth.id);
			this.listenProductCopyRealTimeChanges();
			this.getProductCopyData()
			this.listenRetidaRealTimeChanges()

		},
				computed: {
			...mapState('auth', ['users']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),

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
			...mapActions('productCopy' , ['listenProductCopyRealTimeChanges', 'getProductCopyData']),

			...mapActions('price' , ['listenPriceRealTimeChanges']),

			
			...mapActions('category' , ['listencategoryRealTimeChanges']),
			...mapActions('provider' , ['listenProviderRealTimeChanges']),
			...mapActions('customer' , ['listenCustomerRealTimeChanges']),
			...mapActions('stockEntry' , ['listenStockEntryRealTimeChanges']),
			...mapActions('stockExit' , ['listenStockExitRealTimeChanges']),
			...mapActions('role' , ['listenRoleRealTimeChanges']),
			// retirada de dinheiro no caixa
			...mapActions('retirada' , ['listenRetidaRealTimeChanges']),
			...mapActions('notification' , ['listenNotificationRealTimeChanges']),
			...mapActions('checkedProduct', ['listenCheckedProductRealTime']),
			...mapActions('sale', ['listenSaleRealTimeChanges']),
			...mapActions('invoice', ['listeninvoiceRealTimeChanges']),
			...mapActions('box', ['listenBoxRealTimeChanges']),
			...mapActions('expo', ['findProductByName','getAllExpoProducts']),
			
			...mapActions('auxliarExpo', ['filterMyProducts']),


			
				

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

