<template>
  <q-card class="my-card" bordered>
   
    <q-card-section>
    <q-list dense  class="text-capitalize	"v-for="(prod, index) in product" :key ='index' >
      <q-item clickable v-ripple @click ='selectProduct({id: index, product : prod })'>
        <!-- <q-item-section >
         {{prod.name}} |   <span class="text-red-5"  v-if="prod.quantity < 5 ">       {{prod.quantity}}  </span> <span  v-else>    {{prod.quantity}}  </span>      
        </q-item-section> -->

        <div class="row">
            <div class="col q-pr-sm"> 
            {{prod.name}}
            </div>
              
            <div class="col-2">
               <span class="text-red-5 q-px-md"  v-if="prod.quantity < 5 ">       {{prod.quantity}}  </span> <span class="text-green-5"  v-else>    {{prod.quantity}}  </span> 
            </div>
        </div>
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