<template>
	<q-page padding>
		<!-- content -->

		<div class="row justify-end q-py-md">
			<q-btn
				color="primary"
				icon="add"
				label="Adicionar"
				unelevated
				@click="$router.push('/products/add')"
			/>
		</div>
		<q-markup-table
			flat
			bordered
			square
			class="q-pa-md"
			:style="$q.platform.is.mobile ? 'width: 100%' : ''"
		>
			<products-header-component class="q-pa-sm" />

			<tbody>
				<products-body-component
					v-for="(product, index) in products"
					:key="index"
					:product="product"
					@deleteUser="deleteUserFromDb"
				/>
			</tbody>
		</q-markup-table>

		<AddUserDialog
			:dialog="dialog"
			@closeDialog="dialog = false"
			@emitData="registerUser"
		/>
	</q-page>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	import ProductsBodyComponent from '../../components/admin/product/ProductsBodyComponent';
	import ProductsHeaderComponent from '../../components/admin/product/ProductsHeaderComponent';
	import AddUserDialog from '../../components/admin/users/AddUserDialog';

	export default {
		// name: 'PageName',
		data() {
			return {
				dialog: false
			};
		},
		computed: {
			...mapState('product', ['products'])
		},

		methods: {
			...mapActions('auth', ['registerUser', 'deleteUserFromDb'])
		},
		components: {
			ProductsHeaderComponent,
			ProductsBodyComponent,
			AddUserDialog
		}
	};
</script>
