

<template>
      <thead>
        <tr>
          <th colspan="7">
            <div class="row no-wrap items-center">
              <q-img
                style="width: 70px"
                :ratio="1"
                class="rounded-borders"
         src="https://img.icons8.com/bubbles/100/000000/user.png"
              />

              <div class="text-h6 q-ml-md text-secondary">Produtos</div>
            </div>
          </th>
        </tr>
          
        <tr>
          <th class="text-left">Nome</th>
         <th class="text-left">Categoria</th>
          <th class="text-left">Quantidade</th>
         <th class="text-left">Forncedor</th>
  
          <th class="text-center">Data de Registo</th>
          <th class="text-center">Acção</th>
        </tr>
      </thead>
     
</template>

<script>


    export default {
        name: "UserHeaderComponent"
    }
</script>

<style scoped>

</style>
