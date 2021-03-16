<template>
	<q-drawer
		v-model="drawwerLeft"
		show-if-above
		:width="300"
		:breakpoint="600"
	>
		<q-scroll-area
			style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
		>
			<q-list padding class="text-grey-9">
				<q-item clickable v-ripple to="/sales" exact>
					<q-item-section avatar>
						<q-icon name="home" />
					</q-item-section>

					<q-item-section>
						Visão Geral
					</q-item-section>
				</q-item>

				<q-item clickable v-ripple to="/sales/editor" exact :disable='!getBoxStatus'>
					<q-item-section avatar>
						<q-icon name="local_grocery_store" />
					</q-item-section>

					<q-item-section>
						Venda
					</q-item-section>
				</q-item>

				<q-item clickable v-ripple to="/sales/accept" exact 	> 
					<q-item-section avatar>
						<q-icon name="assignment" />
					</q-item-section>

					
					<div class="row"> 
						<span class="q-pt-sm q-pr-md">Novos Produtos</span>  	
						  <q-spinner-rings
						  v-if="Object.keys(getProductToAccept).length > 0"
							color="deep-orange"
							size="2.9em"
							
							/>

						</div>

				</q-item>

				<!-- <q-item clickable v-ripple to="/sales/invoices">
					<q-item-section avatar>
						<q-icon name="payment" />
					</q-item-section>

					<q-item-section>
						Cotação-Factura
					</q-item-section>
				</q-item> -->
				<q-item
					clickable
					v-ripple
					
					to="/sales/mysale"
					active-color="light-green-6"
				>
					<q-item-section avatar>
						<q-icon name="attach_money" />
					</q-item-section>

					<q-item-section>
						Minhas Vendas
					</q-item-section>
				</q-item>

				<!-- <q-item clickable v-ripple disable>
					<q-item-section avatar>
						<q-icon name="account_circle" />
					</q-item-section>

					<q-item-section>
						Minha Conta
					</q-item-section>
				</q-item> -->

				<q-item clickable v-ripple @click="$emit('exit')">
					<q-item-section avatar>
						<q-icon name="arrow_back" />
					</q-item-section>

					<q-item-section>
						Sair
					</q-item-section>
				</q-item>
			</q-list>
		</q-scroll-area>
		<q-img class="absolute-top bg-white" style="height: 150px ">
			<div class="absolute-center bg-transparent">
				<q-avatar size="80px" class="q-pa-md text-center">
					<img
						class=""	
						src="https://img.icons8.com/color/96/000000/user-male-circle.png"
					/>
				</q-avatar>
				<div
					class="text-white text-center text-black text-bold q-pt-md text-body1"
				>
					@<small> {{ userName }}</small>
				</div>
			</div>
		</q-img>
	</q-drawer>
</template>

<script>
	import { mapGetters, mapState ,mapActions} from 'vuex';
	import { date } from 'quasar';
	export default {
		props: ['userName', 'drawer'],

		data() {
			return {
				drawwerLeft: false,
				disable : true

			};
		},

		computed: {
		...mapState('box', ['boxs']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapState('auxliarExpo', ['expoProducts', 'myProducts']),

			getProductToAccept() {
					let myProducts = {};
				Object.keys(this.myProducts).forEach(element => {
					let prod = this.myProducts[element];

					if (!prod.statusDelivery) {
						myProducts[element] = prod;
					}
				});

				return myProducts;

			
			},



			getBoxStatus() {
				let status = false;

				if (this.boxs) {
					Object.keys(this.boxs).forEach((element, index) => {
						let box = this.boxs[element];

						if (
							box.createdBy.id === this.getUserAuth.id &&
							box.status
						) {
							status = true;

						}
					});
				}

				return status;
			}
		},

		watch: {
			drawer(val) {
				if (val) {
					this.drawwerLeft = val;
				}
			}
		}
	};
</script>

<style></style>
