<template>
    <div class="col-12  col-md-4  ">
        <q-card class="my-card text-center  ">

            <q-btn
                color=""
                flat
                icon="more_horiz"
                class="absolute-top-right"
             
            >
                <q-menu>

                    <q-list style="">
                        <!--TODO: implementar a actualização de vagas-->
                        <q-item clickable v-close-popup>
                            <q-item-section   >Editar</q-item-section>
                        </q-item>
                        <!--TODO: Implementar a remoção de vagas-->
                        <q-item clickable v-close-popup class="text-red"  >
                            <q-item-section  >Remover </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
                <q-avatar color="primary" text-color="white"  icon="bar_chart"></q-avatar>



          
            <div style="">
                <q-card-section>
                    <div class="text-h6 text-primary">Licenca vitalicia</div>
                    <div class="text-body1 ">
                        
                       Trabalho e pesquisa no campo     
                       
                    </div>
                </q-card-section>

               
                <q-card-actions>
                   
                    <q-btn
                            flat
                            color="primary"
                            class="full-width q-ma-sm"
                            label = 'Ver detalhes'
                            
                            >
                       
                        <q-tooltip>
                            Mais Informação sobre a licença
                        </q-tooltip>
                    </q-btn>
                </q-card-actions>
            </div>
        </q-card>
    </div>

</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    import { date } from 'quasar'

    export default {
        name: "VacancyComponent",
        props: ['vacancy', 'id'],
        components: { },

      data () {
      return {
   
      }
    },
        computed: {
        },
       methods: {
             ...mapActions ('vacancy', [
                'deleteVacancy'
            ]),

          
            details(id){

               this.$router.push('/admin/vacancy/' + id)
      
            }
            
            

        },
        filters: {
            limitLength (val, length) {
                return val.length > length ? val.substr(0, length) + '...' : val
            }
                
           

        }
    }
</script>

<style scoped>

</style>