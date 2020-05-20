<template >
        <q-page  class="bg-primary" >
             <div class="row ">
        <div class="col-xs-12 col-sm-6 col-md-4 offset-sm-3 offset-sm-4">
            <q-card
                class="q-mt-xl"
              
            >
                <div class="text-center ">
                    <q-icon name="person_pin" color="primary" size="100px"/>

                    <p style="font-weight: bold;font-size: 14pt">Login</p>

                </div>

                <div class="q-px-md q-pb-md">

                    <form-component name="Login" @emitData="loginUser" />

                </div>

            </q-card>
        </div>
    </div>
        </q-page>
   
</template>

<script>
    import { mapActions } from 'vuex'
    import FormComponent from "../../components/auth/FormComponent";
    export default {
        name: "Login",
        components: {FormComponent},
        methods: {
            ...mapActions('auth', [
                'loginUser'
            ]),
        }
    }
</script>

<style scoped>

</style>