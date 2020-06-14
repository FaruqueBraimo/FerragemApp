<template>
	<q-page padding>
		<!-- content -->

		<div class="row justify-end q-py-sm">
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
			<customers-header-component class="q-pa-sm" />

			<tbody>
				<customers-body-component
					v-for="(customer, index) in customers"
					:key="index"
					:customer="Object.assign({id: index},customer)"
					@deleteCustomer="removeCustumer"
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

	import CustomersBodyComponent from '../../components/admin/customer/CustomerBodyComponent';
	import CustomersHeaderComponent from '../../components/admin/customer/CustomerHeaderComponent';
	import AddCustomerDialog from '../../components/admin/customer/AddCustomerDialog';

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
			...mapActions('customer', ['addCustomer', 'deleteCustomer']),

			removeCustumer(id) {
            let customerName = this.customers[id].name
            this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar o cliente ${customerName} ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
							this.deleteCustomer(id);
					});

          },
		},
		components: {
			CustomersHeaderComponent,
			CustomersBodyComponent,
			AddCustomerDialog,
		}
	};
</script>
