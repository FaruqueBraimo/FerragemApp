<template>
	<q-layout view="hHh LpR fFf" class="bg-grey-1">
		<q-header class="bg-primary shadow-1" reveal height-hint="60">
			<q-toolbar class="toolbar">
				<div class="q-pr-lg" v-if="$q.screen.gt.xs">
					<q-icon name="rv_hookup" size="xl" />
					<span class="text-h6">SG Ferragem A</span>
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

		<drawerComponent />

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
	import drawerComponent from '../components/admin/drawer/drawerComponent';
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
		methods: {
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
						this.$router.push('/');
					});
			}
		}
	};
</script>

<style >
.toolbar{
  height: 54px;
}

</style>
