<template>
   <div id="q-app" class="text-grey-9">
    <router-view  v-if="!$q.platform.is.mobile">

    </router-view>

<div class = 'q-pa-xl text-h6 text-bold text-center '   v-else> 
        <p> Versao Mobile em desenvolvimento</p>
  </div>
  
</div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'App',
    created () {
        this.listenUsersRealTimeChanges ()
       
    },
      methods: {
          ...mapActions('auth', [
              'handleAuthStateChange',
              'listenUsersRealTimeChanges',
          ]),

         
         
      }
      ,
      beforeDestroy () {
          this.$q.loading.hide()
      }

 
  }
</script>
