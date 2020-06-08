<template>
  <span>
    <q-card clickable v-ripple class="my-card bg-white" flat bordered square>
       <div class="text-left q-pa-sm	">
         <q-chip square size="sm"> 
        <q-avatar color="red-4" text-color="white">50</q-avatar>
        Productos
      </q-chip>
           
          </q-icon>

        </div>
         <q-btn
                flat
                icon="more_horiz"
                class="absolute-top-right "
                text-color="grey-8"
            >
                <q-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section  @click="$emit('updateCategory',category)">Editar</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup class="text-red"  >
                            <q-item-section @click="$emit('removeCategory',idCategory)">Remover  </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
         <q-img
        src="statics/category/3.png"
        basic
      >
        <div class="absolute-bottom text-body1 text-bold text-center text-white">
                     {{category.name}}

        </div>
      </q-img>

      <q-tooltip content-class="bg-secondary text-white shadow-4 text-caption" :offset="[10, 10]">
          {{category.description}}
        </q-tooltip>
      

    
    </q-card>
  </span>
</template>

<script>
export default {
  props: ["category","idCategory"]
};
</script>

<style>
#btn :hover {
  transition: 0.5s;
  background: #4d91d0;
  color: white;
}
</style>
