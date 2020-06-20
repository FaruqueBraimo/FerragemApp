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

    <q-list  	 >

       <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 400px; "
    >
      <div v-for="(product, index) in products" 	:key="index" class="q-pa-xs">
        <product-component
					:product="Object.assign({id: index},product)"
					:productId="index"
          @addToCard ='addToCard' 
          @removeChecked='removeChecked'
  
      />
      </div>
    </q-scroll-area>

      


          </q-list>
          <div class="q-pa-md 			" v-if="Object.keys(checkedProducts).length > 0" > 
              <q-btn color="deep-purple" no-caps class=" full-width" @click="$router.push('/sales/card')" unelevated  icon="add_shopping_cart" label="Ver Carinha" />
        </div>



  </q-page>
</template>

<script>
	import ProductComponent from '../../components/sales/products/ProductsComponent';
	import { mapActions, mapState ,mapGetters} from 'vuex';

export default {
    data() {
      return {
         search : '',
         productChecked : {},
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
      }
    },
	computed: {
      ...mapState('product', ['products','checkedProducts']), 
      ...mapGetters('checkedProduct',['getCheckedProducts']),
       ...mapState('checkedProduct', ['checkedProducts']),
		},
    components : {
        ProductComponent
    } ,
    methods: {
            ...mapActions('setting', ['setPageTitle']),
              ...mapActions('checkedProduct', ['addCheckedProducts' , 'removeChecked']),

            
            
            addToCard(product) {
              this.addCheckedProducts(product)

            }

    },
    mounted() {
      this.setPageTitle('Produtos');
        

    }
,
      destroyed() {
              this.setPageTitle('')

      }
    

}
</script>

<style>

</style>