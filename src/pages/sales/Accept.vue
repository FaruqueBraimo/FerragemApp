<template>
    <div class="row q-pa-md">
				<div class="col-12 q-pl-lg text-bold text-center  text-red-5">
					{{
						Object.keys(getProductToAccept).length > 0
							? `Foram enviados produtos para ti, por favor aceite ou recuse!`
							: ` Sem Productos novos`
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
				objectToSave: {},
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

						myProducts[element] = prod;
					
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

			...mapActions('auxliarExpo', [ 'filterMyProducts', 'deleteAuxiliarExpoProduct']),
			 ...mapActions('expo', ['updateExpoProduct', 'addExpoProduct' ]),


			accept(payload) {
				let product = {};
				let prod = {};
				let statusSave = false

				prod = this.myProducts[payload];
				let externProduct = {}
				let internProduct = {}

			

						let quantity = 0;
	if (Object.keys(this.expoProducts).length > 0) {
			this.verify(payload)
					Object.keys(this.expoProducts).forEach(chave => {


							externProduct =  this.expoProducts[chave]
							
								if (
									 externProduct.productId ===
									 prod.productId
								) {
						quantity =
								externProduct.quantity +
								prod.quantity;



					this.updateExpoProduct({
						id: chave,
						updates: {
							quantity: quantity,
 						}
					});
					         this.deleteAuxiliarExpoProduct(payload)

				
								} 

									
							});

	}
	else {
		this.addExpoProduct(prod)

         this.deleteAuxiliarExpoProduct(payload)
		this.filterMyProducts(this.getUserAuth.id);
		
	}

	if(statusSave) {
			
										this.addExpoProduct(prod)
 										this.deleteAuxiliarExpoProduct(payload)
		 								this.filterMyProducts(this.getUserAuth.id);
						 				this.getProductToAccept
										 statusSave = false

	}

			 
// if(!statusSave) {
// 	this.$router.go()
// }

						
			},

			verify(object) {
				let product = {};
				let prod = {};
			

				prod = this.myProducts[object];
				let externProduct = {}
				let internProduct = {}

						let quantity = 0;
					Object.keys(this.expoProducts).forEach(chave => {


							externProduct =  this.expoProducts[chave]
							
								if (
									 externProduct.productId ===
									 prod.productId
								) {
									this.objectToSave.save = false								

								} else{
										this.objectToSave.save = true	
							    	}
								
								
							});



							if(this.objectToSave.save === true) {
								this.addExpoProduct(prod)
 										this.deleteAuxiliarExpoProduct(object)
		 								this.filterMyProducts(this.getUserAuth.id);
						 				this.getProductToAccept
							}
			

			
		}},

		mounted() {
			this.filterMyProducts(this.getUserAuth.id);
			this.setPageTitle('Produtos Enviados');
		
		},

		updated() {
			this.getProductToAccept
					 				this.filterMyProducts(this.getUserAuth.id);

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
