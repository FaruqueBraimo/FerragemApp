<template>
  <q-page  padding class="q-pa-md">
        <table-produc
        @removeChecked="removeChecked"
        @findProductByName='addProductForSale'
      
        />
  </q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';

import TableProduc from "../../components/sales/editor/TableProduc";
export default {       
		data() {
			return {
				search: '',
				productChecked: {},
				thumbStyle: {
					right: '4px',
					borderRadius: '5px',
					backgroundColor: '#027be3',
					width: '5px',
					opacity: 0.75
				},

				barStyle: {
					right: '2px',
					borderRadius: '9px',
					backgroundColor: '#027be3',
					width: '9px',
					opacity: 0.2
				}
			};
		},
		computed: {
			...mapState('product', ['products', 'checkedProducts']),
			...mapGetters('checkedProduct', ['getSubTotal']),
			...mapState('checkedProduct', ['checkedProducts']),
			  ...mapState('expo', ['saleProduct']),
			           			...mapGetters('auth', ['getUserName', 'getUserAuth']),


		},
		components: {
			TableProduc
		},
		methods: {
      ...mapActions('setting', ['setPageTitle']),
      			...mapActions('expo', ['findProductByName']),

			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
        'updateCheckedProducts'



			]),


			addProductForSale(payload) {

					this.findProductByName( {
						label : payload , user : this.getUserAuth.id
					})


			},
 
			addToCard(product) {
				this.addCheckedProducts(product);
			}
		},
		mounted() {
			this.setPageTitle('Editor de Vendas ');
			
		},
		destroyed() {
			this.setPageTitle('');
		}
	}
</script>

<style>

</style>