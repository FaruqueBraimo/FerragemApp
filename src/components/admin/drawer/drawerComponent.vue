<template>
   <q-drawer
      show-if-above
      bordered
      content-class=" text-grey-7 bg-blue-grey-10 text-h6"
      :width="320"
    >
      <div class="  bg-blue-grey-10 text-white">


         <q-banner inline-actions class=" text-center text-uppercase q-pl-lg  bg-blue-grey-9">
      <span class="text-body1 text-center"> Painel de Administração </span>
    
    </q-banner>

        <q-card
          clickable
          v-ripple
          class="my-card bg-blue-grey-10"
          flat
          bordered
        >
          <q-card-section class="text-center q-pa-lg	">
            <q-avatar size="70px" color="blue-grey" text-color="white">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class=" text-uppercase text-bold text-body2 text-green-4 text-center q-pt-sm  ">
              Gerson Muvavele
            </div>
          </q-card-section>
        </q-card>

        <q-list dark padding class="rounded-borders" style="max-width: 328px">
          <q-item clickable v-ripple class="q-pa-md">
            <q-item-section avatar>
              <q-icon name="apps" />
            </q-item-section>

            <q-item-section>Categorias</q-item-section>
          </q-item>

          <q-expansion-item
            dense-toggle
            icon="local_grocery_store"
            label="Produtos"
            header-class="text-white q-pa-md"
          >
            <q-list class="text-body1">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="add" />
                </q-item-section>
                <q-item-section>Registar Produtos</q-item-section>
              </q-item>
            </q-list>

            
          </q-expansion-item>

          <q-item clickable v-ripple class="q-pa-md">
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>

            <q-item-section>Fornecedores</q-item-section>
          </q-item>

          <q-item clickable v-ripple class="q-pa-md">
            <q-item-section avatar>
              <q-icon name="people_alt" />
            </q-item-section>

            <q-item-section>Clientes</q-item-section>
          </q-item>

          <q-expansion-item
            icon="assessment"
            label="Relatórios"
            header-class="text-white q-pa-md"
            dense-toggle
          >
            <q-card class="bg-grey-9">
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
               
              </q-card-section>
            </q-card>
          </q-expansion-item>

          
          <q-expansion-item
            icon="work"
            label="Stock"
            header-class=" q-pa-md"
            dense-toggle
            my-active-class
            my-exact-active-class
          >
              <q-list class="text-body1">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="subdirectory_arrow_right" />
                </q-item-section>
                <q-item-section>Entrada Produtos</q-item-section>
              </q-item>

               <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="red-5" name="subdirectory_arrow_left" />
                </q-item-section>
                <q-item-section>Saída Produtos</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>



            <q-expansion-item
            icon="person"
            label="Utlizadores"
            header-class=" q-pa-md"
            dense-toggle
            my-active-class
            my-exact-active-class
          >
            <q-card class="bg-grey-9">
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
             
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </q-drawer>
</template>

<script>
export default {

}
</script>

<style>

</style>