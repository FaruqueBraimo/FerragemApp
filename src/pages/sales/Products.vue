<template>
  <q-page  padding>
    
        <div class="q-pa-md">
         <q-input
        v-model="search"
        filled
        square
        rounded 
        dense
        placeholder="Pesquisa"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>


        </div>

    <q-list  	v-for="(product, index) in products" 	:key="index" >

      <product-component
				
					:product="Object.assign({id: index},product)"
					:productId="index"
          @addToCard = 'addToCard' 
      
      
      />
          </q-list>



  </q-page>
</template>

<script>
	import ProductComponent from '../../components/sales/products/ProductsComponent';
	import { mapActions, mapState ,mapGetters} from 'vuex';

export default {
    data() {
      return {
         search : '',
         productChecked : {}
      }
    },
	computed: {
      ...mapState('product', ['products']),
      ...mapGetters('checkedProduct',['getCheckedProducts'])
      
		},
    components : {
        ProductComponent
    } ,
    methods: {
            ...mapActions('setting', ['setPageTitle']),
              ...mapActions('checkedProduct', ['addCheckedProducts']),

            
            
            addToCard(product) {
              this.addCheckedProducts(product)

            }

    },
    mounted() {
      this.setPageTitle('Produtos')
    }
,
      destroyed() {
              this.setPageTitle('')

      }
    

}
</script>

<style>

</style>