<template>
  <q-page  padding class="q-pa-md">
        <TableProduc @findProductByName="addProductForSale" @findProductByCode ="findProductByCode"
		 @user="user = $event" 
		 @obs="obs =$event"
	
        
		 
		 />
		  

		<div class="q-pa-md q-mx-xl row justify-center">
			<div class="col-4 justify-center">
				 <q-btn-dropdown color="primary" label="Finalizar operação">
     <q-list bordered padding class="rounded-borders text-primary q-pa-md">
      <q-item
        clickable
        v-ripple
        :active="link === 'inbox'"
        @click="link = 'inbox'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="attach_money"  color="deep-orange"/>
        </q-item-section>

        <q-item-section class="text-deep-orange">Efectuar Vender</q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="link === 'outbox'"
        @click="link = 'outbox'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="receipt" />
        </q-item-section>

        <q-item-section>Factura</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'trash'"
        @click="link = 'trash'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="book" />
        </q-item-section>

        <q-item-section>Cotacão</q-item-section>
      </q-item>


     
    </q-list>
    </q-btn-dropdown>
			</div>
		</div>
  </q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';

import TableProduc from "../../components/sales/editor/TableProduc";
export default {       
		data() {
			return {
				search: '',
				  link: 'inbox',
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
			...mapGetters('expo', ['findProductForSale','searchProduct']),
			...mapState('checkedProduct', ['checkedProducts']),
			  ...mapState('expo', ['saleProduct', 'productSearchKey'] ),
			           			...mapGetters('auth', ['getUserName', 'getUserAuth']),


		},
		components: {
			TableProduc
		},
		methods: {
      ...mapActions('setting', ['setPageTitle']),
      			...mapActions('expo', ['setExpoProductsearchKey']),

			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
        'updateCheckedProducts'



			]),

			findProductByCode() {

			},


			addProductForSale(payload) {
					this.setExpoProductsearchKey(payload)


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