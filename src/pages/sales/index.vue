<template >
<q-page class='q-pa-md'> 
   <tamplate v-if ='$q.platform.is.desktop'>
    <q-card class="my-card text-bold text-center " square flat >
      <q-img
        src="/statics/welcome.png"
        basic
        style="height: 320px; max-width: 300px"

      >
        
      </q-img>
    </q-card>
    <div class=" text-subtitle2 text-center">
          Bem Vindo(a)
        </div>

        <div class="q-px-xl q-pa-md" > 
              <q-btn color="deep-purple" no-caps class="q-pa-sm  full-width text-body1"  unelevated  icon="open_in_browser" label="Abrir Caixa" />
        </div>

        
         <div class="q-px-xl" > 
              <q-btn color="red-5" no-caps class=" q-pa-sm full-width text-body1"  unelevated  icon="close" label="Fechar Caixa" />
        </div>

    <div class='text-center text-bold q-pt-xl text-grey-8 absolute-bottom'> 
		 <hr  class="q-mb-sm"/>
		  <p>Desenvolvido pela Gest Midia. Lda &copy; 2020</p>
	 </div>
</tamplate>


  <tamplate v-if ='$q.platform.is.mobile'>
    <q-card class="my-card text-bold text-center " square flat >
      <q-img
        src="/statics/welcome.png"
        basic
      >
        
      </q-img>
    </q-card>
    <div class=" text-subtitle2 text-center">
          Bem Vindo
        </div>

        <div class="q-pa-md" > 
              <q-btn color="deep-purple" no-caps class=" full-width"  unelevated  icon="open_in_browser" label="Abrir Caixa" />
        </div>

        
         <div class="q-px-md" > 
              <q-btn color="red-5" no-caps class=" full-width"  unelevated  icon="close" label="Fechar Caixa" />
        </div>

    <div class='text-center text-bold q-pt-xl text-grey-8 absolute-bottom'> 
		 <hr  class="q-mb-sm"/>
		  <p>Desenvolvido pela Gest Midia. Lda &copy; 2020</p>
	 </div>
</tamplate>
    </q-page>
    
</template>




<script>
import { mapActions, mapState } from 'vuex';

export default {

 methods: {
      			...mapActions('setting', ['setPageTitle']),

    },
    mounted() {
      this.setPageTitle('Ferragem A')
    }
,
      destroyed() {
              this.setPageTitle('')

      }
    
}

</script>

<style>

</style>