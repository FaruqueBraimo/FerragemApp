<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated class="bg-white">
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					drawerOrNor
					@click="clickLeftDrawerOpen"
					 :icon="icon"
					aria-label="Menu"
					color="black"
				/>
				<q-space/>

				<q-toolbar-title class="text-subtitle1 q-pl-md text-bold text-center text-grey-6">
					{{pageTitle}} 
				</q-toolbar-title>
                <q-space/>
                 <q-avatar>
      <img src="https://img.icons8.com/color/96/000000/user-male-circle.png">
    </q-avatar>
			</q-toolbar>
		</q-header>
		
		</transition>

		<transition appear>
				<drawerMobileComponent :drawer='leftDrawerOpen' :userName="getUserName(userAuth)" />
		</transition>


		<q-footer elevated class="" v-if="this.$route.fullPath == '/'">
			<div>
				<q-tabs
					indicator-color="transparent"
					active-color="light-green-6"
					no-caps
					class="bg-white text-grey-5 shadow-0 adjust-size "
				>
					<q-route-tab to="/profile" exact icon="person_pin" />

					<q-route-tab to="/diario" exact>
						<q-spinner-grid color="light-green-6" size="1.7em" />
					</q-route-tab>

					<q-route-tab to="/about" exact icon="info" />
				</q-tabs>
			</div>
		</q-footer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<style lang="css">
	.q-tab-full {
		min-height: 0;
		padding: 5px 10px;
		margin-bottom: 5px;
	}
</style>

<script>
	 	import drawerMobileComponent from '../components/admin/drawer/drawerMobileComponent';
	import notificationComponent from '../components/admin/notification/notificationComponent';
		import notificationComponent2 from '../components/admin/notification/notificationComponent2';

    import { date } from 'quasar'
	import { mapGetters, mapState, mapActions } from 'vuex';
	import { showErrorMessage } from '../functions/handle-error-messages';

	export default {
		name: 'AdminLayout',

		components: {
			drawerMobileComponent,
			notificationComponent,
			notificationComponent2
		},
		data() {
			return {
				leftDrawerOpen: false,
				search: '',
				storage: 0.26,
				dialog: false
			};
		},
		mounted() {
			 if(this.$q.platform.is.desktop) {
				  this.$router.push('/admin')
                }
                
                else if (this.$q.platform.is.mobile) {
                   
                }
			/// Verify if user is logged or no
			if (!this.getUserAuth) {
				this.$router.push('/');
				this.$router.go();
				showErrorMessage('Sem permissão, por favor autentique-se');
			}
			//Verify if user account has blocked
			if (!this.userAuth.status) {
				this.$router.push('/');
				showErrorMessage('Conta bloqueada, contacte o administrador');
			}
		},

		computed: {
			...mapState('auth', ['users', 'userAuth']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapState('product', ['products']),
			...mapState('setting', ['pageTitle']),
icon (){
  let caminho =  this.$route.fullPath
  let icon = ''          
             if ( caminho === "/sales" ) {
				 icon = "menu"
			 }
              else icon =  "arrow_back"

              return icon
     }

		},
		methods: {
			...mapActions('auth', ['logoutUser']),

			clickLeftDrawerOpen() {
				if(this.icon == 'menu') {
					this.leftDrawerOpen = !this.leftDrawerOpen
				}
				else{
					this.$router.go(-1)
				}
			},

			confirm() {
				this.$q
					.dialog({
						title: 'Confirme',
						message: 'Tem certeza que deseja sair do sistema?',
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
						this.logoutUser();
					});
			}
		}
	};
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Lobster&display=swap');
	.toolbar {
		height: 54px;
	}
	#logo {
		font-family: 'Fredoka One', cursive;
	}
</style>