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
			<stock-entry-header-component class="q-pa-sm" />

			<tbody>
				<customers-body-component
					v-for="(customer, index) in customers"
					:key="index"
					:customer="customer"
					@deleteUser="deleteCustomer"
				/>
			</tbody>
		</q-markup-table>

		<add-customer-dialog
			:dialog="dialog"
			@closeDialog="dialog = false"
			@emitData="addCustomer"
		/>
		
	</q-page>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	import stockEntryBodyComponent from '../../components/admin/stock/entry/stockEntryBodyComponent';
	import stockEntryHeaderComponent from '../../components/admin/stock/entry/stockEntryHeaderComponent';
	import AddEntryStockComponent from '../../components/admin/stock/entry/AddEntryStockComponent';

	export default {
		// name: 'PageName',
		data() {
			return {
				dialog: false
			};
		},
		computed: {
			...mapState('customer', ['customers'])
		},

		methods: {
			...mapActions('customer', ['addCustomer', 'deleteCustomer'])
		},
		components: {
			stockEntryHeaderComponent,
			stockEntryBodyComponent,
			AddEntryStockComponent,
		}
	};
</script>
