<template>
    <div class="row q-pa-md">
				<div class="col-12 q-pl-lg text-bold">
					{{
						Object.keys(getProductToAccept).length > 0
							? `Foram enviados produtos para ti, por favor aceite ou recuse!`
							: ``
					}}
				</div>
 
				<div class="" style="">
					<div class="row  justify-left q-pa-md q-ma-sm">
						<div
							class=" col-6  "
							v-for="(exported, index) in getProductToAccept"
							:key="index"
						>
							<productToAccept
								:exported="
									Object.assign({ id: index }, exported)
								"
								:id="index"
								@accept="accept"
							/>
						</div>
					</div>
				</div>
			</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import openBoxComponent from '../../components/sales/openBoxComponent';
	import productToAccept from 'components/sales/productToAccept';
	import { date } from 'quasar';

	export default {
		data() {
			return {
				open: false,
				updateCategory: false,
				MyBox: {},
				count: 0

			};
		},
		components: {
			openBoxComponent,
			productToAccept
		},

		computed: {
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapGetters('setting', ['getLocalBoxStatus']),
			...mapState('auxliarExpo', ['expoProducts', 'myProducts']),
				...mapState('expo', ['expoProducts', 'expoProducts']),

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

			
		},

		methods: {
			...mapActions('setting', [
				'setPageTitle',
				'addBoxStatus',
				'emptyBoxStatus'
			]),
			...mapActions('box', ['addBox', 'editBox']),

			...mapActions('auxliarExpo', [ 'filterMyProducts']),
			 ...mapActions('expo', ['updateExpoProduct', 'addExpoProduct' ]),


			accept(payload) {
				let product = {};
				let prod = {};

				prod = this.myProducts[payload];
				let externProduct = {}
				let internProduct = {}

	if (Object.keys(this.expoProducts).length > 0) {
					Object.keys(this.expoProducts).forEach(chave => {


							externProduct =  this.expoProducts[chave]
							
								if (
									( externProduct.productId !==
									prod.productId) 
								) {

					// 	  this.updateExpoProduct({
					// 	id: payload,
					// 	updates: {
					// 		statusDelivery: true,
 					// 	}
					// });
					console.log(externProduct)
									
 
								}

									
							});

	}

			 

				this.filterMyProducts(this.getUserAuth.id);
			},

			
		},

		mounted() {
			this.filterMyProducts(this.getUserAuth.id);
			this.setPageTitle('Produtos Enviados');
		
		},
		filters: {
			dateFormat(val) {
				if (val ) {

				
				var months = [
					'Janeiro',
					'Fevereiro',
					'Março',
					'Abril',
					'Maio',
					'Junho',
					'Julho',
					'Agosto',
					'Setembro',
					'Outubro',
					'Novembro',
					'Dezembro'
				];
				let dateCreated = new Date(val.seconds * 1000);
				return (
					dateCreated.getHours() +
					'h' + ':' +
					dateCreated.getMinutes()
					
				);
			}
		}},
		
		destroyed() {
			this.setPageTitle('');
		},
	};
</script>

<style></style>
