<template>
<q-page class="q-pa-md" padding>
          <q-card class="my-card text-bold text-center " square flat>
      <q-img
        src="/statics/invoice.png"
        basic
      >
        
      </q-img>
    </q-card>
        <p class="text-center text-bold">Veja Cotação ou Factura </p>

         <div class="q-pa-md" > 
              <q-btn color="primary" no-caps class=" full-width"  @click='info' unelevated  icon="list" label="Minhas Cotaçoes" />
        </div>

        
         <div class="q-px-md" > 
              <q-btn color="deep-orange" no-caps class=" full-width"   @click='info' unelevated  icon="book" label="Minhas Facturas" />
        </div>


</q-page>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {

 methods: {
            ...mapActions('setting', ['setPageTitle']),
            info() {
             this.$q
					 .dialog({
						title: 'Em Manutenção',
						message: 'Ainda não pode ver as faturas/cotaçoes por si geradas. Grado pela compreensão',
						ok: 'Sim',
						cancel: false,
						persistent: true
					})
					.onOk(() => {
						// this.logoutUser();
					});
            }

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