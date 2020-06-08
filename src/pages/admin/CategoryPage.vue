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
        <AddCategoryDialog
                :dialog="dialog  || !!updateCategory "
                @closeDialog='closeDialog'
                @emitData='addcategory'
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
    },

  data () {
    return {
     dialog: false,
     updateCategory : false
   
    }
  },
   methods: {
     
          ...mapActions('category', ['addcategory','deleteCategory']),
          
          removeCategory(id) {
            let categoryName = this.categories[id].name
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
							this.deleteCategory(id);
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