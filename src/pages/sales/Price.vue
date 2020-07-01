<template>
	<q-page class="q-pa-md" padding>
		<price-component
			@price="makeprice"
			v-if="Object.keys(priceObject).length === 0"
		/>

		<div id="printMe" v-if="Object.keys(priceObject).length > 0">
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
				Cotação de Produtos
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
				<div class="col">Data de Emissão :</div>
				<div class="col text-right q-pr-md">
					{{ new Date() | dateFormat }}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col ">Prazo :</div>
				<div class="col text-right q-pr-md">
					{{ priceObject.deadline | StringToDate | dateFormat }}
				</div>
			</div>

			<div class="row q-pa-sm  ">
				<div class="col-6 text-left">
					Desconto de Iva :
				</div>
				<div class="col text-right q-pr-md">
					{{ priceObject.iva || 0 }}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Cliente :</div>
				<div class="col text-right q-pr-md">
					{{
						priceObject.client
							? priceObject.client.label
							: 'Nao informado'
					}}
				</div>
			</div>

		
			<hr class="text-center q-ma-sm" />

			<div class="row q-pa-sm ">
				<div class="col text-bold">Total :</div>
				<div class="col text-right q-pr-md">
					{{ priceObject.subtotal || 0 }} ,00 MT
				</div>
			</div>
			<div class="text-center q-py-sm text-body2 ">Obrigado!</div>
		</div>
		<div class="q-pt-md col-12" v-if="Object.keys(priceObject).length > 0">
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
	import priceComponent from '../../components/sales/price/priceComponent';
	import { mapActions, mapState, mapGetters } from 'vuex';
	import { date } from 'quasar';

	export default {
		data() {
			return {
				search: '',
				productChecked: {},
				priceObject: {}
			};
		},
		computed: {
			...mapState('product', ['products']),
			...mapGetters('checkedProduct', ['getSubTotal']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),

			...mapState('checkedProduct', ['checkedProducts'])
		},
		components: {
			priceComponent
		},
		methods: {
			...mapActions('setting', ['setPageTitle']),
			...mapActions('price', ['addPrice',]),
			...mapActions('checkedProduct', ['emptyChecked']),
			...mapActions('product', ['updateProduct', ]),


			makeprice(price) {
				this.priceObject = price;
				this.priceObject.pricesMan = this.getUserAuth;
				let priceDone = Object.assign(
					this.priceObject,
					this.checkedProducts
				);
                this.addPrice(priceDone);
				
			},
			printTable() {
				// Pass the element id here
				this.$htmlToPaper('printMe');
				this.emptyChecked();
			},

			
		},
		mounted() {
			this.setPageTitle('Cotação ');
		},
		destroyed() {
			this.setPageTitle('');
		},

		filters: {
              StringToDate(val) {
            const dateReturn = date.extractDate(val, 'DD-MM-YYYY ')
             return dateReturn   
        }, 
        
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
