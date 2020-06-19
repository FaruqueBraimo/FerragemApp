<template>
<q-page class="q-pa-md" padding>
          <q-card class="my-card text-bold text-center " square flat>
      <q-img
        src="/statics/invoice.png"
        basic
      >
        
      </q-img>
    </q-card>
        <p class="text-center text-bold">Emita Cotação ou Factura </p>

         <div class="q-pa-md" > 
              <q-btn color="primary" no-caps class=" full-width"  unelevated  icon="list" label="Emitir Cotação" />
        </div>

        
         <div class="q-px-md" > 
              <q-btn color="deep-orange" no-caps class=" full-width"  unelevated  icon="book" label="Emitir Factura" />
        </div>


</q-page>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {

 methods: {
      			...mapActions('setting', ['setPageTitle']),

    },
    mounted() {
      this.setPageTitle('Facturas')
    }
,
      destroyed() {
              this.setPageTitle('')

      }
    
}

</script>
<style>

</style>