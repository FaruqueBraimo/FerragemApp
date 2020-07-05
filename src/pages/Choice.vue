<template>
	<q-page class=' '>
        <q-header elevated class="bg-cyan">
        <q-toolbar>
<div class="q-pr-lg" v-if="$q.screen.gt.xs">
					<q-icon name="rv_hookup" size="xl" />
					<span class="text-h6" id="logo">SG Ferragem A </span>
				</div>
          <q-space />

        <q-btn
						exact
						rounded
						flat
						icon="exit_to_app"
						label="Sair"
						@click="logoutUser"
						class="q-pt-md"
					>
						<q-tooltip
							content-class="text-white shadow-4"
							:offset="[10, 10]"
						>
							Clique para sair da app</q-tooltip
						>
					</q-btn>
        </q-toolbar>

      
      </q-header>

		<div class="row justify-center q-pt-xl items-center vertical-middle	">
			<div class="col-6 justify-center items-center">
				<q-card class="q-ma-xl shadow-5 " 	 square>
					<q-card-section>
                       <q-btn
                        color="teal"
                        no-caps
                        class=" full-width q-pa-xl text-h6 "
                        unelevated
                        label="Gestão de Stock"
                        cursor-pointer	
                        
                        @click="$router.push('/admin')"
			/>
                    </q-card-section>
				</q-card>
			</div>

            <div class="col-6 items-center">
				<q-card class="q-ma-xl shadow-5" square>
					<q-card-section>
                       <q-btn
                        color="cyan"
                        no-caps
                        class=" full-width q-pa-xl text-h6"
                        unelevated
                        label="Vendas"
                        @click="info"
			/>
                    </q-card-section>
				</q-card>
			</div>
		</div>
         <div class='text-center text-bold q-pt-xl text-grey-8 absolute-bottom'> 
		 <hr  class="q-mb-sm"/>
		  <p>Desenvolvido pela Gest Midia. Lda &copy; 2020</p>
	 </div>

	</q-page>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name: 'Login',
		components: {  },
		methods: {
			...mapActions('auth', ['logoutUser']),

			info() {
				// $router.push('/sales')

				this.$q
					.dialog({
						title: 'Em Manutenção',
						message: 'Por favor, aceda o site atraves do celular para poder vender produtos, gerar faturas, cotacão e muito mais.',
						ok: 'Sim',
						cancel: false,
						persistent: true
					})
					.onOk(() => {
						// this.logoutUser();
					});
			}
		}
	};
</script>

<style scoped></style>
