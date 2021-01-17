<template>
  <q-card class="my-card" bordered>
   
    <q-card-section>
    <q-list dense  class="text-capitalize	"v-for="(prod, index) in product" :key ='index' >
      <q-item clickable v-ripple @click ='selectProduct({id: index, product : prod })'>
        <q-item-section >
         {{prod.name}}
        </q-item-section>
      </q-item>

     
    </q-list>
    </q-card-section>
  </q-card>
  
 
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {

  props : ['product'],

  methods: {

    	...mapActions('expo', ['productToSale'
			
      ]),
      

    selectProduct(val) {
        this.productToSale(val)
    }
  },
}
</script>