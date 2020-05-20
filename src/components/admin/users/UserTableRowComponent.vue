<template>
    <tr>
        <td class="text-left">
            <q-avatar color="red" text-color="white">
                <q-img src="https://alpinepc.com/wp-content/uploads/2011/07/Opi51c74dfa1fef6.png" spinner-color="white" />
            </q-avatar>
            <span v-if="$q.platform.is.mobile">
                  <br>
                  {{ user.name }} <br>
                  {{ user.email }}
                </span>
            <span v-else>
                  {{ user.name }}
                </span>
        </td>
        <td v-if="!$q.platform.is.mobile" class="text-right">{{ user.email }}</td>
        <td class="text-right q-gutter-md">
            <q-btn-dropdown
                split
                color="grey-8"
                rounded
                outline
                :label="userRoleName"
            >
                <q-list>
                    <q-item
                        v-for="item in options"
                        @click="changeRole(item)"
                        :class="{'active-class' : userRoleName === item}"
                        clickable
                        :key="item"
                        v-close-popup
                    >
                        <q-item-section>
                            <q-item-label>{{ item }}</q-item-label>
                        </q-item-section>
                    </q-item>


                </q-list>
            </q-btn-dropdown>
            <q-btn :size="$q.platform.is.mobile ? 'sm' : 'md'" color="white" text-color="red" round icon="delete" @click="isAdmin = true" />
        </td>
    </tr>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: "UserTableRowComponent",
        props: ['user'],
        data () {
            return {
                role: null,
                options: [
                    'Administrador', 'Editor', 'Cliente', 'Candidato', 'Outro'
                ]
            }
        },
        computed: {
            userRoleName () {
                return this.user.role ? this.user.role : 'Outro'
            }
        },
        mounted () {
            // console.log(this.user)
        },
        methods: {

            ...mapActions('settings', [
                'setGlobalConfirm',
            ]),
            ...mapActions('auth', [
                'updateUser',
            ]),
            changeRole (role) {

                if (role !== this.userRoleName ) {

                    this.$q.dialog({
                        title: 'Novo perfil',
                        message: 'Tem certeza de que deseja tornar \'' + role + '\' a(o) \'' + this.user.name + '\'',
                        cancel: true,
                    }).onOk(() => {

                        this.updateUser ({
                            id: this.user.id,
                            updates:  {role: role}
                        })

                    })
                }

            },

        },

    }
</script>

<style scoped>
    .active-class {
        background: rgb(240,240,240);
    }

</style>