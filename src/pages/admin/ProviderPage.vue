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
			<providers-header-component class="q-pa-sm" 
			@filterByNuit="filterByNuit"
			@filterByName='filterByName'
			
			/>

			<tbody>
				<providers-body-component
					v-for="(provider, index, count) in providers"
					:key="index"
					:provider="Object.assign({id: index, count: count},provider)"
					@deleteProvider="removeProvider"
					@updateObject='updateObject =$event'

				/>
			</tbody>
		</q-markup-table>
		<div class='row justify-end q-mt-md'> 	<q-btn color="teal" icon="check"  label="Carregar mais"  @click='getProviderData' />	 </div>
	
				<div class='row justify-center q-mt-md'> 
					
      <!-- <q-inner-loading :showing="loading">
				      <q-spinner-pie color="orange" size="50px" />

      </q-inner-loading>	
					 -->
						 </div>

		<add-provider-dialog
			:dialog="dialog"
			@closeDialog="closeDialog "
			@emitData="addProvider"
			:updateObject='updateObject'

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
				dialog: false,
				updateObject : ''
			};
		},
		computed: {
			...mapState('provider', ['providers','loading'])
		},

		methods: {
		...mapActions('provider', ['addProvider',  'getProviderData', 'deleteProvider','filterByNuit','filterByName']),

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
		  closeDialog(){
				this.dialog = false;
				this.updateObject='';
								  

		  }
			
		},
		components: {
			ProvidersHeaderComponent,
			ProvidersBodyComponent,
			AddProviderDialog
		},
		watch: {
			
		}
	};
</script>
