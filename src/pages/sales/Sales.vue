<template>
	<q-page class='q-pa-md' padding>

		<sales-component/>

		
		<div class="row q-pa-lg">
		<div class="q-pa-sm col">
				<q-btn
					color="indigo"
					no-caps
					class=" full-width"
					unelevated
					icon="done"
					label="Finalizar"
				/>
			</div>

		
		</div>
	</q-page>
</template>

<script>
	import salesComponent from '../../components/sales/sales/salesComponent';
	import { mapActions, mapState, mapGetters } from 'vuex';

	export default {
		data() {
			return {
				search: '',
				productChecked: {},
				thumbStyle: {
					right: '4px',
					borderRadius: '5px',
					backgroundColor: '#027be3',
					width: '5px',
					opacity: 0.75
				},

				barStyle: {
					right: '2px',
					borderRadius: '9px',
					backgroundColor: '#027be3',
					width: '9px',
					opacity: 0.2
				}
			};
		},
		computed: {
			...mapState('product', ['products', 'checkedProducts']),
			...mapGetters('checkedProduct', ['getSubTotal']),
			...mapState('checkedProduct', ['checkedProducts'])
		},
		components: {
			salesComponent
		},
		methods: {
			...mapActions('setting', ['setPageTitle']),
			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
				'updateCheckedProducts'
			]),

			addToCard(product) {
				this.addCheckedProducts(product);
			}
		},
		mounted() {
			this.setPageTitle('Venda ');
		},
		destroyed() {
			this.setPageTitle('');
		}
	};
</script>

<style></style>
