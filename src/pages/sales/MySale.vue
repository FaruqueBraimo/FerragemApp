<template>
  <q-page  padding>

       <div class=" justify-center	">

		  
				<mysale
                		:sale="Object.assign({ id: index }, sale)"
					:saleId="index"
				

				/>
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