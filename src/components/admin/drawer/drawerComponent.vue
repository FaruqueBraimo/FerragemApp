<template>
	<q-drawer show-if-above bordered :width="280">
		<div>
			<q-card flat class="shadow-0 ">
				<q-card-section class="text-center q-pa-md">
					<q-avatar size="70px" color="">
						<img
							src="https://img.icons8.com/color/96/000000/user-male-circle.png"
						/>
					</q-avatar>
					<div class="text-capitalize text-center q-py-sm">
						<p>{{userName}}</p>
						<small>{{userAuth.role.label || ''}}</small>
					</div>
				</q-card-section>
			</q-card>
			<q-separator />

			<q-list
				dark
				padding
				class="rounded-borders text-white "
				style="max-width: 328px"
			>
				<q-item clickable v-ripple to="/admin" exact>
					<q-item-section avatar>
						<q-icon name="home" />
					</q-item-section>

					<q-item-section>
						<p>Inicio</p>
					</q-item-section>
				</q-item>

				<q-item clickable v-ripple exact to="/category" v-if="roles[userAuth.role.value].category  === 'true'">
					<q-item-section avatar>
						<q-icon name="apps" />
					</q-item-section>

					<q-item-section  >
						<p>Categorias</p>
					</q-item-section>
				</q-item>
				<q-expansion-item
					dense-toggle
					icon="local_grocery_store"
					label="Produtos"
					header-class="grey-8"
					expand-icon-class="text-grey-8"
					class="ex-item blue"
					v-if="roles[userAuth.role.value].products  === 'true'"
				>
					<q-list class="text-body1">
						<q-item clickable v-ripple>
							<q-list class="text-body1">
								<q-item clickable v-ripple to="/products">
									<q-item-section avatar>
										<q-icon color="primary" name="book" />
									</q-item-section>
									<q-item-section>
										<p>Lista de Produtos</p>
									</q-item-section>
								</q-item>

								<q-item clickable v-ripple 	@click="$router.push('/products/add/' + null)">
									<q-item-section avatar>
										<q-icon color="primary" name="add" />
									</q-item-section>
									<q-item-section>
										<p>Adicionar</p>
									</q-item-section>
								</q-item>
							</q-list>
						</q-item>
					</q-list>
				</q-expansion-item>

				<q-item clickable v-ripple exact to="/providers" v-if="roles[userAuth.role.value].providers  === 'true'">
					<q-item-section avatar>
						<q-icon name="group" />
					</q-item-section>

					<q-item-section>
						<p>Fornecedores</p>
					</q-item-section>
				</q-item>

				<q-item clickable v-ripple exact to="/customers" v-if="roles[userAuth.role.value].clients  === 'true'">
					<q-item-section avatar>
						<q-icon name="people_alt" />
					</q-item-section>
					<q-item-section>
						<p>Clientes</p>
					</q-item-section>
				</q-item>

				<q-expansion-item
					icon="work"
					label="Stock"
					dense-toggle
					my-active-class
					my-exact-active-class
					expand-icon-class="text-grey-8"
					class="ex-item"
					v-if="roles[userAuth.role.value].stocks  === 'true'"
					
				>
					<q-list class="text-body1">
						<q-item clickable v-ripple to="entradas">
							<q-item-section avatar>
								<q-icon
									color="primary"
									name="subdirectory_arrow_right"
								/>
							</q-item-section>
							<q-item-section>
		
								<p>Entrada de Produtos</p>
							</q-item-section>
						</q-item>

						<q-item disable v-ripple>
							<q-item-section avatar>
								<q-icon
									color="red-5"
									name="subdirectory_arrow_left"
								/>
							</q-item-section>
							<q-item-section>
								<p>Saída Produtos</p>
							</q-item-section>
						</q-item>
					</q-list>
				</q-expansion-item>



				<q-expansion-item
					icon="assessment"
					label="Relatórios"
					expand-icon-class="text-grey-8"
					dense-toggle
					class="ex-item"
					v-if="roles[userAuth.role.value].reports  === 'true'"
				>
					<q-card>
						<div class="text-center text-caption text-red-4 q-pa-md">
							Tudo sobre Relatórios brevemente
						</div>
					</q-card>
				</q-expansion-item>

				
				<q-expansion-item
					icon="person"
					label="Utilizadores"
					dense-toggle
					my-active-class
					my-exact-active-class
					expand-icon-class="text-grey-8"
					class="ex-item"
					v-if="roles[userAuth.role.value].users === 'true'"
				>
					<q-list class="text-body1">
						<q-item clickable v-ripple to="/users">
							<q-item-section avatar>
								<q-icon
									color="primary"
									name="list_alt"
								/>
							</q-item-section>
							<q-item-section>
		
								<p>Lista de Utilizadores</p>
							</q-item-section>
						</q-item>

						<q-item clickable v-ripple to='/roles'>
							<q-item-section avatar>
								<q-icon
									color="red-5"
									name="check_box"
								/>
							</q-item-section>
							<q-item-section>
								<p>Permissões</p>
							</q-item-section>
						</q-item>
					</q-list>
				</q-expansion-item>

			
			</q-list>
		</div>
	</q-drawer>
</template>

<script>
		import { mapGetters, mapState ,mapActions} from 'vuex';

	export default {
		props:['userName'],

		computed: {
			...mapState('auth', ['users', 'userAuth',]),
			...mapState('role', ['roles']),
			...mapGetters('auth', ['getUserName', 'getUserAuth'])
			
		
		},
	};
</script>

<style scoped>
	p {
		font-size: 1rem;
		margin: 0.1rem;
	}
	.ex-item {
		font-size: 1rem;
		margin: 0.1rem;
		color: #585858;
	}
	* {
		color: #585858;
	}
	small {
		font-size: 0.8rem;
		color: #b4b4b4;
	}
</style>
