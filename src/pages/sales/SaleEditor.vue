<template>
  <q-page  padding class="q-pa-md">

        <table-produc/>
  </q-page>
</template>

<script>

import TableProduc from "../../components/sales/editor/TableProduc";
export default {
       
       
       data() {
			return {
				drawwerLeft: false,
				disable : true

            };
       },

       components: {
                TableProduc
       }


}
</script>

<style>

</style>