<template>
	<div id="q-app" class="text-grey-9">
		<!-- v-if="!$q.platform.is.mobile" -->
		<router-view> </router-view>
		<!-- 
		<div class="q-pa-xl text-h6 text-bold text-center ">
			<p>Versao Mobile em desenvolvimento</p>
		</div> -->
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name: 'App',
		created() {
			this.listenUsersRealTimeChanges();
			this.listenProductRealTimeChanges();
		},
		methods: {
			...mapActions('auth', [
				'handleAuthStateChange',
				'listenUsersRealTimeChanges',
				'listenProductRealTimeChanges'
				
			]),

			...mapActions('product' , ['listenProductRealTimeChanges'])
		},
		beforeDestroy() {
			this.$q.loading.hide();
		}
	};
</script>
