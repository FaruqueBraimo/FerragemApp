<template>
  <tr>
    <td class="text-left">
      {{ license.arqId.label }}
    </td>
    <td class="text-left">{{ license.startAt }}</td>
    <td class="text-left">{{ license.endAt }}</td>
    <td class="text-left">{{ license.nameSite }}</td>
    <td class="text-left">{{license.typeResearch}}</td>
    <td class="text-left"><q-chip class="deep-orange"  color="deep-orange" text-color="white">
        45
      </q-chip></td>

    <td>
      <q-chip class="glossy" square color="teal" text-color="white">
        Activo
      </q-chip>
    </td>
    <td class="text-left">{{ license.address }}</td>

    <td class="text-center ">
      <q-btn
        color="white"
        text-color="black"
        icon="receipt"
        label="Ver mais"
        size="sm"
      >
        <q-tooltip
          content-class="bg-amber text-black shadow-4"
          :offset="[10, 10]"
        >
          Ver detalhes
        </q-tooltip>
      </q-btn>

      <q-btn
        color="white"
        text-color="cyan"
        flat
        round
        icon="edit"
        @click="$emit('editlicense', license)"
      >
        <q-tooltip content-class="bg-indigo" :offset="[10, 10]">
          Editar dados da licença
        </q-tooltip>
      </q-btn>

      <q-btn
        color="white"
        text-color="red"
        flat
        round
        icon="delete"
        @click="$emit('deletelicense', license)"
      >
        <q-tooltip content-class="bg-red" :offset="[10, 10]">
          Remover dados do arqueologo
        </q-tooltip>
      </q-btn>
    </td>
  </tr>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "licensesTableRowComponent",
  components: {},
  props: ["license"],
  data() {
    return {
      isFunc: false,
      showCV: false
    };
  },
  computed: {
    ...mapGetters("auth", ["getSmallImage"])
  },

  methods: {},
  watch: {
    
  }
};
</script>

<style scoped></style>
