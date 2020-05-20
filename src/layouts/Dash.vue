<template>
  <q-layout view="hHh LpR fFf" class="bg-grey-3">
    <q-header class="bg-grey-3 text-grey-9" reveal height-hint="60">
      <q-toolbar class="GPLAY__toolbar text-grey-6">
        

        <div class="q-pr-lg" v-if="$q.screen.gt.xs">
          <q-icon name="rv_hookup" size="xl" color="green-6" /> <span  class="text-h6 text-green-6">SG Ferragem A</span> 

        
        </div>

        <q-space />

        <div class="q-pl-md q-gutter-sm row no-wrap items-center">

            <q-tooltip>SG Ferragem</q-tooltip>
          </q-btn>

          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notificacoes</q-tooltip>
          </q-btn>

          <q-btn
        class=" text-red-5"
        exact
        rounded
        flat
        icon="exit_to_app"
        label="Sair"
        @click="confirm"
        >
      <q-tooltip
            content-class="bg-amber text-black shadow-4"
            :offset="[10, 10]"
          >
            Clique  para sair da app</q-tooltip>

      </q-btn>
        </div>
      </q-toolbar>
    </q-header>

   <drawerComponent/>



    <q-page-container>
      <router-view />

      <q-page-sticky expand position="top">
        <q-toolbar class="GPLAY__sticky bg-white q-px-xl">
                <q-breadcrumbs-el label="início " icon="home" />

          <q-space />
         
        </q-toolbar>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import drawerComponent from '../components/admin/drawer/drawerComponent'
export default {
  name: "AdminLayout",

  components : {
drawerComponent
  },
  data() {
    return {
      leftDrawerOpen: false,
      search: "",
      storage: 0.26,
    
    };
  },
   methods: {
    confirm() {
      this.$q
        .dialog({
          title: "Confirme",
          message: "Deseja sair do sistema?",
          ok: "Sim",
          cancel: true,
          cancel: "Não",
          persistent: true
        })
        .onOk(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>

<style lang="sass">
.GPLAY
  &__toolbar
    height: 60px
  &__logo
    width: 183px
    height: 39px
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    max-width: 60px
    width: 100%
  &__drawer-link
    .q-item__section--avatar
      margin: -8px 0 -8px -16px
      padding: 8px 0 8px 16px
    .q-item__section--main
      margin: -8px -16px -8px 16px
      padding: 8px 16px 8px 2px
      font-size: 18px
      font-weight: 300
    &--apps, &--movies, &--music, &--books, &--devices
      background: #f5f5f5!important
      &:hover
        color: #eee !important
    &--apps:hover
      background: #43a047!important
    &--movies:hover
      background: #e53935!important
    &--music:hover
      background: #fb8c00!important
    &--books:hover
      background: #1e88e5!important
    &--devices:hover
      background: #546e7a!important
  &__drawer-item
    padding: 6px 12px 6px 23px
  &__sticky
    min-height: 49px
    border-bottom: 1px solid rgba(0,0,0,0.12)
  &__sticky-help
    border: 1px solid #ccc
    padding-left: 8px
    padding-right: 8px
  &__sticky-settings
    padding-left: 17px
    padding-right: 17px
    border: 1px solid #ccc
</style>
