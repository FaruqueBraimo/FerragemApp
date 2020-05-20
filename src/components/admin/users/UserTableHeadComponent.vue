<template>
    <thead>
    <tr>
        <th class="text-left">Nome</th>
        <th v-if="!$q.platform.is.mobile" class="text-right">Email</th>
        <th class="text-right">Admin | Deletar</th>
    </tr>
    </thead>
</template>

<script>
    export default {
        name: "UserTableHeadComponent"
    }
</script>

<style scoped>

</style>