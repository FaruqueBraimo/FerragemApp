<template>
	<q-layout view="hHh LpR fFf" class="bg-grey-1">
		<q-header class="bg-primary shadow-1" reveal height-hint="60">
			<q-toolbar class="toolbar">
				<div class="q-pr-lg" v-if="$q.screen.gt.xs">
					<q-icon name="rv_hookup" size="xl" />
					<span class="text-h6" id='logo'>SG Ferragem A </span>
				</div>

				<q-space />

				<div class="q-pl-md q-gutter-sm row no-wrap items-center">
					<q-btn round dense flat color="white" icon="notifications">
						<q-badge color="red" text-color="white" floating>
							2
						</q-badge>
						<q-tooltip>Notificacoes</q-tooltip>
					</q-btn>

					<q-btn
						exact
						rounded
						flat
						icon="exit_to_app"
						label="Sair"
						@click="confirm"
					>
						<q-tooltip
							content-class="text-white shadow-4"
							:offset="[10, 10]"
						>
							Clique para sair da app</q-tooltip
						>
					</q-btn>
				</div>
			</q-toolbar>
		</q-header>

		<drawerComponent
		:userName='getUserName(userAuth)'
		
		 />

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
	import drawerComponent from '../components/admin/drawer/drawerComponent';
		import { mapGetters, mapState ,mapActions} from 'vuex';
import { showErrorMessage } from "../functions/handle-error-messages";


	export default {
		name: 'AdminLayout',

		components: {
			drawerComponent
		},
		data() {
			return {
				leftDrawerOpen: false,
				search: '',
				storage: 0.26
			};
		},
		mounted() {
			if (!this.getUserAuth) {
				this.$router.push('/');				
				   this.$router.go()
				    showErrorMessage('Sem permissão, por favor autentique-se');
			}

			if (!this.userAuth.status) {
				this.$router.push('/');
				 showErrorMessage('Conta bloqueada, contacte o administrador');
			}
			
		},

		computed: {
			...mapState('auth', ['users', 'userAuth',]),
			...mapGetters('auth', ['getUserName', 'getUserAuth'])
			
		
		},
		methods: {
						...mapActions('auth', ['logoutUser']),

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

<style >
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Lobster&display=swap');
.toolbar{
  height: 54px;
}
#logo{
font-family: 'Fredoka One', cursive;
}

</style>
