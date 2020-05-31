<template>
  <q-page :style-fn="myTweak" padding>

         <div class="row q-mb-xl justify-left	">
          <div class=" col-4 q-pa-sm  " v-for="(category, index) in categories" :key="index">
            <category-component
            :category='category'
             />
          </div>
        </div>
        <AddCategoryDialog
                :dialog="dialog"
                @closeDialog='dialog=false'
                @emitData='addcategory'

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
 name : 'Category Page',

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
   
    }
  },
   methods: {
     
    			...mapActions('category', ['addcategory'])

  },
}
</script>

<style>

</style>