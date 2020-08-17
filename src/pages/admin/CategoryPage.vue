<template>
  <q-page  padding>

         <div class="row q-mb-xl justify-left	">
          <div class=" col-4 q-pa-sm  " v-for="(category, index) in categories" :key="index">
            <category-component
            
            :category='Object.assign({id: index},category)'
            :idCategory='index'
            @removeCategory='removeCategory'
            @updateCategory='updateCategory = $event'
             />
             
          </div>
        </div>
        
			<q-card flat class="my-card bg-grey-1  q-pa-lg fixed-center q-ma-lg" v-if="Object.keys(categories).length == 0">
				<q-card-actions vertical align="center">
					<div class="text-green text-bold text-h6">Sem Categorias</div>
          <div class="text-green  text-body">Toque no botão abaixo, para adicionar</div>

				</q-card-actions>
			</q-card>

        <AddCategoryDialog
                :dialog="dialog  || !!updateCategory "
                @closeDialog='closeDialog'
                @emitData='registerCategory'
                :updateCategory='updateCategory' 


        /> 
         <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" @click="dialog=true"/>
          </q-page-sticky>
  </q-page>
</template>

<script>
import CategoryComponent from "../../components/admin/category/CategoryComponent";
import AddCategoryDialog from "../../components/admin/category/AddCategoryDialog";
  import { mapActions, mapState } from 'vuex'

export default {
 name : 'CategoryPage',

components: {
    CategoryComponent,
    AddCategoryDialog
   
  },
  computed: {
        ...mapState('category', [
            'categories'
        ]),
        			...mapState('product', ['products'])

    },

  data () {
    return {
     dialog: false,
     updateCategory : false
   
    }
  },
   methods: {
     
          ...mapActions('category', ['addCategory','deleteCategory', 'filterCategoryDatafromDb']),
          ...mapActions('product', ['filterCategoryDatafromDb']),

          registerCategory(data) {
            this.addCategory(data)
          },
          removeCategory(id) {
            // toLowerCase().includes
            let categoryName = this.categories[id].name
           this.filterCategoryDatafromDb({value : id})
            this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar a categoria ${categoryName} ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {

            
            if(Object.keys(this.products).length == 0) {
	                  this.deleteCategory(id);
            }
            else {
                this.$q
					.dialog({
						title: 'Não Permitido',
						message: `Não pode apagar a categoria ${categoryName} , por que existem alguns produtos associados a ela.`,
						cancel: false,
						ok: false,
					})

            }
						
					});

          },
          closeDialog() {
            this.dialog=false;
            this.updateCategory=false;
          }

          

  },
}
</script>

<style>

</style>