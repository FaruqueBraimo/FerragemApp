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
			<providers-header-component class="q-pa-sm" />

			<tbody>
				<providers-body-component
					v-for="(provider, index) in providers"
					:key="index"
					:provider="Object.assign({id: index},provider)"
					@deleteProvider="removeProvider"
				/>
			</tbody>
		</q-markup-table>

		<add-provider-dialog
			:dialog="dialog"
			@closeDialog="dialog = false"
			@emitData="addProvider"
		/>
	</q-page>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	import ProvidersBodyComponent from '../../components/admin/provider/ProvidersBodyComponent';
	import ProvidersHeaderComponent from '../../components/admin/provider/ProvidersHeaderComponent';
	import AddProviderDialog from '../../components/admin/provider/AddProviderDialog';

	export default {
		// name: 'PageName',
		data() {
			return {
				dialog: false
			};
		},
		computed: {
			...mapState('provider', ['providers'])
		},

		methods: {
		...mapActions('provider', ['addProvider', 'deleteProvider']),

		removeProvider(id) {
            let providerName = this.providers[id].name
            this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar o funcionário ${providerName} ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
							this.deleteProvider(id);
					});

          },
			
		},
		components: {
			ProvidersHeaderComponent,
			ProvidersBodyComponent,
			AddProviderDialog
		}
	};
</script>
