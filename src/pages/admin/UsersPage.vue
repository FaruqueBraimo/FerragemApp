<template>
  <q-page padding>
    <!-- content -->

    <div class="row justify-end q-py-md">
    <q-btn color="primary" icon="add" label="Adicionar" unelevated @click="dialog=true"/>

    </div >
     <q-markup-table flat bordered square class="q-pa-md"   :style="$q.platform.is.mobile ? 'width: 100%' : ''">

       
         <users-header-component
            class="q-pa-sm"
         />

          <tbody>

            <users-body-component
         v-for="(user,index) in users"
         :key="index"
         :user="user"
         @deleteUser='deleteUserFromDb' 
         />

          </tbody>
        </q-markup-table>

        <AddUserDialog
                :dialog="dialog"
                @closeDialog='dialog=false'
                @emitData='registerUser'

        /> 



  


  </q-page>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  
  import UsersBodyComponent from "../../components/admin/users/UsersBodyComponent";
    import UsersHeaderComponent from "../../components/admin/users/UsersHeaderComponent";
    import AddUserDialog from "../../components/admin/users/AddUserDialog";


export default {
  // name: 'PageName',
  data () {
    return {
     dialog: false,
   
    }
  },
    computed: {
        ...mapState('auth', [
            'users'
        ]),
    },
    
  methods: {
     
    			...mapActions('auth', ['registerUser', "deleteUserFromDb"])

  },
  components: {
     UsersHeaderComponent,
     UsersBodyComponent,
     AddUserDialog
  }
}
</script>
