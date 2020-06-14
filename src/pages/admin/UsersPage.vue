<template>
	<q-page padding>
		<!-- content -->

		<div class="row justify-end q-py-md">
			<q-btn
				color="primary"
				icon="add"
				label="Adicionar"
				unelevated
				@click="dialog = true"
			/>
		</div>
		<q-markup-table
			flat
			bordered
			square
			class="q-pa-md"
			:style="$q.platform.is.mobile ? 'width: 100%' : ''"
		>
			<users-header-component class="q-pa-sm" />

			<tbody>
				<users-body-component
					v-for="(user, index) in users"
					:key="index"
					:user="user"
					@activeOrDesactiveUser="activeUser"
					@updateUser="updateUserObject = $event"
				/>
			</tbody>
		</q-markup-table>

		<add-user-dialog
			:dialog="dialog"
			@closeDialog="dialog = false; "
			@emitData="saveUser"
			:updateUserObject='updateUserObject'
		/>
	</q-page>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	import UsersBodyComponent from '../../components/admin/users/UsersBodyComponent';
	import UsersHeaderComponent from '../../components/admin/users/UsersHeaderComponent';
	import AddUserDialog from '../../components/admin/users/AddUserDialog';

	export default {
		name: 'UserPage',
		data() {
			return {
				dialog: false,
				updateUserObject : {}
			};
		},
		computed: {
			...mapState('auth', ['users'])
		},

		methods: {
			...mapActions('auth', ['registerUser', 'updateUser', 'addUser']),
			
			saveUser(payload) {
				this.registerUser(payload)
				 this.addUser(payload)
			},


			activeUser(user) {
				let userUpdate = {};
				userUpdate.status = !user.status;
				let label = user.status ? 'Desactivar' : 'Activar';

				this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja ${label} o  ${user.name} ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
						this.updateUser({
							id: user.id,
							updates: userUpdate
						});
					});
			}
		},
		components: {
			UsersHeaderComponent,
			UsersBodyComponent,
			AddUserDialog
		},

		watch: {
			updateUserObject(val) {
				if(val) {
					this.dialog = true
				}
			},
			
		}
	};
</script>
