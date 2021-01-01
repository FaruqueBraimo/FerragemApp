<template>
	<q-layout view="hHh LpR fFf" class="bg-grey-1 ">
		<q-header class="bg-primary shadow-1 q-pb-xs" reveal height-hint="60">
			<q-toolbar class="toolbar">
				<div class="q-pr-lg" v-if="$q.screen.gt.xs">
					<q-icon name="rv_hookup" size="xl" />
					<span class="text-h6" id="logo">FStock </span>
				</div>

				

				<q-space />

				
				<q-toolbar-title class="text-h6 q-pl-md text-bold text-center  text-white">
					{{pageTitle}} 
				</q-toolbar-title>
				
                <q-space/>

				<div class="q-pl-md q-gutter-sm row no-wrap items-center">
					<q-btn-dropdown
						round
						dense
						flat
						color="white"
						class="q-pt-md q-pl-md"
						icon-right="notifications"
					>
						<q-card style="width: 400px;">
							<q-card-section class="row items-center" >
								  <q-list>
								      <q-item-label header v-if='Object.keys(productsLowWithQantity).length !== 0 || Object.keys(outDatedProducts).length !== 0' >Notificações</q-item-label>
	  					<q-item-label header v-else  class="text-secondary"> Sem Notificações</q-item-label>

              <q-item-label caption class='q-pl-md q-py-sm text-deep-orange'>Produtos abaixo do Stock</q-item-label>

								<notificationComponent
									v-for="(notification,
									index) in productsLowWithQantity"
									:key="index"
									:notification="
										Object.assign(
											{ id: index },
											notification
										)
									"
								/>
              <q-item-label caption class='q-pl-md q-py-sm text-deep-orange' >Validade de Produtos </q-item-label>


								<notificationComponent2
									v-for="(notification,
									index) in outDatedProducts"
									:key="index"
									:notification="
										Object.assign(
											{ id: index },
											notification
										)
									"
								/>
								 </q-list>
							</q-card-section>
						</q-card>
					</q-btn-dropdown>
					<q-badge color="red " align="bottom" v-if="Object.keys(productsLowWithQantity).length !== 0   || Object.keys(outDatedProducts).length !== 0 " >
						{{ Object.keys(productsLowWithQantity).length + Object.keys(outDatedProducts).length   }}
					</q-badge>

					<q-btn
						exact
						rounded
						flat
						icon="exit_to_app"
						label="Sair"
						@click="confirm"
						class="q-pt-md"
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

		<drawerComponent :userName="getUserName(userAuth)" />

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
	import drawerComponent from '../components/admin/drawer/drawerComponent';
	import notificationComponent from '../components/admin/notification/notificationComponent';
		import notificationComponent2 from '../components/admin/notification/notificationComponent2';

    import { date } from 'quasar'
	import { mapGetters, mapState, mapActions } from 'vuex';
	import { showErrorMessage } from '../functions/handle-error-messages';

	export default {
		name: 'AdminLayout',

		components: {
			drawerComponent,
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
                }
                
                else if (this.$q.platform.is.mobile) {
                    this.$router.push('/sales')
                }
			/// Verify if user is logged or no

			if (!this.getUserAuth) {
				this.$router.push('/');
				showErrorMessage('Sem permissão, por favor autentique-se');
			}
			//Verify if user account has blocked
			if (this.getUserAuth.status == false) {
				this.$router.push('/');
				showErrorMessage('Conta bloqueada, contacte o administrador');
			}
		},

		computed: {
			...mapState('auth', ['users', 'userAuth']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapState('product', ['products','notifications']),
			...mapState('setting', ['pageTitle']),

			
			outDatedProducts() {
				let produtReturned = {};

				Object.keys(this.notifications).forEach((element, key) => {
					let products = this.notifications[element];
					
					let nowDate = Date.now();
					let date30 = date.addToDate(nowDate, { days: 0, month: 1 })
					const dateReturn = date.extractDate( products.expires, 'DD-MM-YYYY ')

						
					
					if ( date30  > dateReturn ) {
							let produtReturned2 = {}
							produtReturned2[element] = products;
						     produtReturned2[element].message2 = `Olá, Em um mês o Produto ${products.name} estára fora de prazo, A data: ${products.expires}`;
						
						     Object.assign(produtReturned, produtReturned2);
					
					}
					 if (nowDate > dateReturn) {
							let produtReturned2 = {}
							produtReturned2[element] = products;
						     produtReturned2[element].message2 = `Olá, o Produto ${products.name} está fora de prazo, Expirou em: ${products.expires}`;
						
						     Object.assign(produtReturned, produtReturned2);

					}
					
					
				});

				return produtReturned;
			},

			productsLowWithQantity() {
				let produtReturned = {};

				Object.keys(this.notifications).forEach((element, key) => {
					let products = this.notifications[element];


					if (products.qtdWarehouse <= products.stockBreak) {
						produtReturned[element] = products;
						produtReturned[element].message = `Olá, o Produto ${products.name} está em roptura do stock, restam apenas ${products.qtdWarehouse} unidades.`;
					}

				
					
					
				});

				return produtReturned;
			}
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

<style>
	@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Lobster&display=swap');
	.toolbar {
		height: 54px;
	}
	#logo {
		font-family: 'Fredoka One', cursive;
	}
</style>
