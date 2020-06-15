<template>
  <div class="q-pa-sm" >
     
      <q-item >
        <q-item-section avatar>
          <q-avatar size="50px" square>
            <img  src="https://img.icons8.com/color/48/000000/shopping-basket-2.png"/>
          </q-avatar>
        </q-item-section>
         <q-item-section>
          <q-item-label>{{product.name}}</q-item-label>
          <q-item-label caption class="text-jusstify"> {{product.description || 'Não definido'}}</q-item-label>
          <q-item-label  class="text-bold text-left text-primary text-overline ">{{product.quantity}}</q-item-label>
        </q-item-section>

        <q-item-section side top >
            <small class="text-pink text-primary">  {{product.price_buy}} MT </small>
               
          <q-space/>
          <q-btn color="deep-purple" size="xs" outline icon="add" unelevated @click="addToCard(product)" round/>
        </q-item-section>
      </q-item>
         <q-separator spaced inset="item" />
      
  </div>
</template>
<script>
export default {
  props:['product' ,'productChecked'],
 data() {
      return {
    search : ''
      }
    },
	computed: {
      // ...mapState('product', ['products']),

      
    },
    
     methods: {
        addToCard(product) {
          this.$emit('addToCard' , product)  
        }
    },
  
}
</script>