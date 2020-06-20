<template>
	<q-page padding>
		<!-- content -->
		

		<div class="row justify-end q-py-md">
		<q-btn-dropdown color="primary" unelevated label="Adicionar" dropdown-icon="change_history">
      <q-list>
        <q-item clickable v-close-popup @click="dialog=true">
          <q-item-section>
            <q-item-label>Produtos Cadastrados</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="$router.push('/products/add/' + null)">
          <q-item-section>
            <q-item-label>Novos Produtos</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-btn-dropdown>
			
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
				<stock-entry-body-component
					v-for="(stock, index) in stockEntries"
					:key="index"
					:stock="Object.assign({id: index},stock)"
					:stockId="index"
					@deletestock='removeCategory'
					@updateObject='updateObject =$event'
					/>
				
			</tbody>
		</q-markup-table>

		<add-Entry-stock-component
			:dialog="dialog"
			@closeDialog="dialog = false"
			@emitData="register"
				:updateObject='updateObject'
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
				dialog: false,
				updateObject : {}
			};
		},
		computed: {
				...mapState('product', ['products']),
		     	...mapState('stockEntry', ['stockEntries'])


		},

		methods: {
			...mapActions('stockEntry' , ['addStockEntry','deleteStockEntry']),
			...mapActions('product', ['updateProduct', ]),

				register(stockData) {
					this.addStockEntry(stockData);
					let lastQtd = ~~ this.products[stockData.productCode].quantity
					let newQtd =  ~~ stockData.quantity
					this.updateProduct( {
						id : stockData.productCode,
						updates : { quantity : +lastQtd+newQtd  } })

				},
				 removeCategory(id) {
            this.$q
					.dialog({
						title: 'Confirme',
						message: `Tem certeza que deseja apagar entrada  ?`,
						ok: 'Sim',
						cancel: true,
						cancel: 'Não',
						persistent: true
					})
					.onOk(() => {
							this.deleteStockEntry(id);
					});

          },

			
		},
		components: {
			stockEntryHeaderComponent,
			stockEntryBodyComponent,
			AddEntryStockComponent,
		},
		watch: {
			updateObject(val) {
				if(val) {
					this.dialog = true
				}
			},
		}
	};
</script>
