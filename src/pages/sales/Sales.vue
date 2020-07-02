<template>
	<q-page class="q-pa-md" padding>
		<sales-component
			@sales="makeSale"
			v-if="Object.keys(saleObject).length === 0"
		/>

		<div id="printMe" v-if="Object.keys(saleObject).length > 0">
			<div class="row q-pa-sm text-center">
				<div class="col-12   text-grey-7 text-center">
					<img
						src="https://img.icons8.com/ios/50/000000/circled-f.png"
					/>
				</div>
				<div class="col-12 text-bold text-h6 text-grey-7 text-center">
					Ferragem A
				</div>
			</div>
			<div class="text-center q-pb-md text-body1 ">
				Recibo de Compra de Produtos
			</div>

			<div class="row q-pa-sm ">
				<div class="col text-bold text-grey-7">Produto</div>

				<div class="col  text-bold text-grey-7 text-right q-pr-md">
					Quantidade
				</div>

				<div class="col  text-bold text-grey-7 text-right q-pr-md">
					Preço
				</div>
			</div>

			<div v-for="product in checkedProducts" :key="product.payload.id">
				<div class="row q-pa-sm">
					<div class="col">{{ product.payload.name }}</div>

					<div class="col text-right q-pr-md">
						{{ product.payload.qtdUnit }}
					</div>

					<div class="col text-right q-pr-md">
						{{ product.payload.price }},00 MT
					</div>
				</div>
			</div>
			<hr class="text-center q-ma-sm" />
			<div class="row q-pa-sm ">
				<div class="col">Valor dado :</div>
				<div class="col text-right q-pr-md">
					{{ saleObject.value || 0 }} ,00 MT
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col ">Troco :</div>
				<div class="col text-right q-pr-md">
					{{ saleObject.change || 0 }} ,00 MT
				</div>
			</div>

			<div class="row q-pa-sm  ">
				<div class="col-6 text-left">
					Desconto de Iva :
				</div>
				<div class="col text-right q-pr-md">
					{{ saleObject.iva || 0 }}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Cliente :</div>
				<div class="col text-right q-pr-md">
					{{
						saleObject.client
							? saleObject.client.label
							: 'Nao informado'
					}}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Data :</div>
				<div class="col text-right q-pr-md">
					{{ new Date() | dateFormat }}
				</div>
			</div>

			<hr class="text-center q-ma-sm" />

			<div class="row q-pa-sm ">
				<div class="col text-bold">Total :</div>
				<div class="col text-right q-pr-md">
					{{ saleObject.subtotal || 0 }} ,00 MT
				</div>
			</div>
			<div class="text-center q-py-sm text-body2 ">Obrigado!</div>
		</div>
		<div class="q-pt-md col-12" v-if="Object.keys(saleObject).length > 0">
			<q-btn
				color="teal"
				no-caps
				class=" full-width"
				unelevated
				icon="done"
				label="Imprimir"
				@click="printTable"
			/>
		</div>
	</q-page>
</template>

<script>
	import salesComponent from '../../components/sales/sales/salesComponent';
	import { mapActions, mapState, mapGetters } from 'vuex';
	import { date } from 'quasar';

	export default {
		data() {
			return {
				search: '',
				productChecked: {},
				saleObject: {}
			};
		},
		computed: {
			...mapState('product', ['products']),
			...mapGetters('checkedProduct', ['getSubTotal']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapState('box', ['boxs']),
			...mapState('checkedProduct', ['checkedProducts'])
		},
		components: {
			salesComponent
		},
		methods: {
			...mapActions('setting', ['setPageTitle']),
			...mapActions('sale', ['addSale', 'removeChecked']),
			...mapActions('checkedProduct', ['emptyChecked']),
			...mapActions('product', ['updateProduct']),
			...mapActions('box', ['addBox', 'editBox']),

			makeSale(sale) {
				this.saleObject = sale;
				this.saleObject.salesMan = this.getUserAuth;
				let saleDone = Object.assign(
					this.saleObject,
					this.checkedProducts
				);
				this.addSale(saleDone);
				this.updateQuantity();
				this.updateCash(sale.subtotal);
			},
			printTable() {
				// Pass the element id here
				this.$htmlToPaper('printMe');
				this.emptyChecked();
			},

			updateCash(newChas) {
				Object.keys(this.boxs).forEach(element => {
					let box = this.boxs[element];
					const oldChash = box.value;

					if (
						box.createdBy.id === this.getUserAuth.id &&
						box.status
					) {
						this.editBox({
							id: element,
							updates: { value: ~~oldChash + ~~newChas }
						});
					}
				});
			},

			updateQuantity() {
				// Abatendo a quantidade no stock
				let qtdBalcony = 0;
				Object.keys(this.products).forEach((element, key) => {
					this.checkedProducts.forEach(element2 => {
						if (element == element2.payload.id) {
							let product = this.products[element];
							qtdBalcony =
								product.qtdBalcony - element2.payload.qtdUnit;
							this.updateProduct({
								id: element,
								updates: { qtdBalcony: qtdBalcony }
							});
						}
					});
				});
			}
		},
		mounted() {
			this.setPageTitle('Venda ');
		},
		destroyed() {
			this.setPageTitle('');
		},

		filters: {
			dateFormat(val) {
				var months = [
					'Janeiro',
					'Fevereiro',
					'Março',
					'Abril',
					'Maio',
					'Junho',
					'Julho',
					'Agosto',
					'Setembro',
					'Outubro',
					'Novembro',
					'Dezembro'
				];
				return (
					val.getDate() +
					' de ' +
					months[val.getMonth()] +
					' de ' +
					val.getFullYear()
				);
			}
		}
	};
</script>

<style></style>
