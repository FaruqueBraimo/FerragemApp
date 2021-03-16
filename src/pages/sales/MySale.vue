<template>
  <q-page  padding>

       <div class="row justify-left	">

      <div class=" col-4 q-pa-md  "	v-for="(sale, index) in filterSaleByUser(getUserAuth.id) "
		  
		   :key="index">
				<mysale
                		:sale="Object.assign({ id: index }, sale)"
					:saleId="index"
				

				/>
			</div>
            </div>
  </q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import mysale from '../../components/sales/mysale';
export default {
    data() {
        return{  
                sales : {}
        }
    },

    computed: {
           
            ...mapGetters('auth', ['getUserName', 'getUserAuth']),
                ...mapState('sale', ['mySale']),
               
                ...mapGetters('sale',['filterSaleByUser'])

        },

	components: {
			mysale
        },
        
        methods: {
             ...mapActions('sale', ['getSaleByUserId']),
              ...mapActions('setting', ['setPageTitle']),
        },

            mounted() {
            this.setPageTitle(' Minhas Vendas ');

               
            } ,
             destroyed() {
			this.setPageTitle('');
		}, 
            
            


}
</script>

<style>

</style>