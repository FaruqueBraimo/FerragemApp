<template>
  <q-page padding class = 'q-pt-xl'>
    <div class="row  q-pa-md justify-center items-center">

       <div class="col q-pa-sm">
         <q-card class="my-card text-grey-10" bordered >

          <q-card-section>
            <div class="row">
               <div class=" col " v-if="Object.keys(users).length>0" >
                 <div> Categorias </div>
                 <span class="text-green-5 text-h4"> {{Object.keys(users).length}}</span> 
                 
                 </div>
               <q-skeleton type="QRadio"  v-else    />

             <div class=" col text-right text-green-5 q-pa-md ">
          <q-icon name="group" style="font-size: 3.0em;" />
              
               </div>
               
               </div>

               <div>
                 
                  Numero total de Categorias no sistemas
                        <q-linear-progress indeterminate color="green-5" class="q-mt-sm" />
              </div>
           
          </q-card-section>
          
        </q-card>
      </div>


       <div class="col q-pa-sm">
         <q-card class="my-card text-grey-10" bordered >

          <q-card-section>
            <div class="row">
               <div class=" col " v-if="Object.keys(users).length>0" >
                 <div> Produtos </div>
                 <span class="text-primary text-h4"> {{Object.keys(users).length}}</span> 
                 
                 </div>
               <q-skeleton type="QRadio"  v-else    />

             <div class=" col text-right text-primary q-pa-md ">
          <q-icon name="group" style="font-size: 3.0em;" />
              
               </div>
               
               </div>

               <div>
                 
                  Numero total de Produtos no sistemas
                        <q-linear-progress indeterminate color="primary" class="q-mt-sm" />
              </div>
           
          </q-card-section>
          
        </q-card>
      </div>


       <div class="col q-pa-sm">
        <q-card class="my-card text-grey-10" bordered >

          <q-card-section>
            <div class="row">
               <div class=" col " v-if="Object.keys(users).length>0" >
                 <div> Fornecedores </div>
                 <span class="text-deep-orange text-h4"> {{Object.keys(users).length}}</span> 
                 
                 </div>
               <q-skeleton type="QRadio"  v-else    />

             <div class=" col text-right text-deep-orange q-pa-md ">
          <q-icon name="group" style="font-size: 3.0em;" />
              
               </div>
               
               </div>

               <div>
                 
                  Numero total de Utilizadores no sistemas
                        <q-linear-progress indeterminate color="deep-orange" class="q-mt-sm" />
              </div>
           
          </q-card-section>
          
        </q-card>
      </div>
     
      
      <div class="col q-pa-sm">
         <q-card class="my-card text-grey-10" bordered >

          <q-card-section>
            <div class="row">
               <div class=" col " v-if="Object.keys(users).length>0" >
                 <div> Utilizadores </div>
                 <span class="text-secondary text-h4"> {{Object.keys(users).length}}</span> 
                 
                 </div>
               <q-skeleton type="QRadio"  v-else    />

             <div class=" col text-right text-secondary q-pa-md ">
          <q-icon name="group" style="font-size: 3.0em;" />
              
               </div>
               
               </div>

               <div>
                 
                  Numero total de Utilizadores no sistemas
                        <q-linear-progress indeterminate color="secondary" class="q-mt-sm" />
              </div>
           
          </q-card-section>
          
        </q-card>
      </div>
    </div>

  <div class=" text-bold text-h5 text-center q-pt-xl"> 
      Em breve aqui vai nascer um gráfico lindo, sozinho! 
    </div>

      
      
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";

import { date } from "quasar";

export default {
 components: {   
  },
  data () {
    return {
      chartData: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
    }
  },
  mounted() {
    this.setActualPageTitle("Página Inicial");

    if (!this.users) {
      this.$router.push("/");
    }
    let user = this.users[this.userAuth.uid];

    //Redireciona o user para outra página, caso o user não seja Administrador nem Editor
  },
  computed: {
    ...mapState("auth", ["users", "userAuth"]),
    



  },
   methods: {
      ...mapActions('settings', [
          'setActualPageTitle'
      ]),}
};
</script>
