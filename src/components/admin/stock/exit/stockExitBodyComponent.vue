<template>
	<tr>
		<td class="text-left">
			<div class="q-pa-md">
				<q-expansion-item
					v-model="expanded"
					icon="local_grocery_store"
					label="Lista de Produtos Exportados"
					caption="Toque Para ver"
				>
					<div class="row q-pa-sm  " id="printMe">
						<div class="col text-bold text-green-7">Produto</div>

						<div class="col  text-bold text-green-7  q-pr-md">
							Quantidade
						</div>

						<div class="col  text-bold text-green-7  q-pr-md">
							subtotal
						</div>
					</div>

					<q-card v-for="(product, key) in stock.products" :key="key">
						<q-card-section>
							<div class="row ">
								<div class="col text-capitalize	">
									{{ product.name }}
								</div>

								<div class="col  q-pr-md">
									{{ product.newQtd }}
								</div>

								<div class="col  q-pr-md">
									{{ product.subtotal }},00 MT
								</div>
							</div>
						</q-card-section>
					</q-card>
				</q-expansion-item>
			</div>
		</td>

		<td>{{ sumTotals.sumMoney }}</td>

		<td>{{ stock.user.label || stock.user }}</td>

		<td class="text-center ">
			{{ stock.createdAt | dateFormat }}
		</td>

		<td class="text-center text-primary" v-if="stock.statusDelivery">
			Aceite
		</td>
		<td class="text-center text-red-5" else>Pendente</td>
		<td class="text-center ">{{ stock.createdBy }}</td>

		<td class=" text-center ">
			<div class="row justify-center items-center" style="width:100px;">
				<div class="col">
					<q-btn
						flat
						rounded
						size="sm"
						text-color="grey-7"
						icon="book"
						@click="print(stockId)"
					/>
				</div>

				<div class="col">
					<q-btn
						flat
						rounded
						size="sm"
						text-color="green"
						icon="info"
						@click="info(stock.obs)"
					/>
				</div>

				<div class="col">
					<q-btn
						flat
						rounded
						size="sm"
						text-color="red"
						icon="delete"
						@click="$emit('deletestock', stockId)"
					/>
				</div>
			</div>
		</td>
	</tr>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import jsPDF from 'jspdf';
	import autoTable from 'jspdf-autotable';

	export default {
		name: 'stockBodyComponent',
		props: ['stock', 'stockId','index'],
		components: {

		},
		data() {
			return {
				dialog: false,
				expanded: false,
				body : []
			};
		},
		computed: {
									...mapState('stockExit', ['stockExits']),

			sumTotals() {
				let totals = {};
				let sumMoney = 0;

				Object.keys(this.stock.products).forEach((element, key) => {
					let product = this.stock.products[element];
					sumMoney = sumMoney + product.subtotal;

					totals.sumMoney = sumMoney;
				});

				return totals;
			}
		},
		mounted() {
			// console.log(this.stock)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('stock', ['updatestock']),

			print(val) {

				let product = this.stockExits[val];


				Object.keys(product.products).forEach((element, key) => {
					let prod = product.products[element];

					this.body.push([prod.name], [prod.newQtd], [prod.subtotal]);
					console.log(prod.name)
				});



				const doc = new jsPDF();

				doc.text('Relatorio', 1, 10);
				doc.line(0, 35,400,35)

				// doc.autoTable({
				// 	columnStyles: { europe: { halign: 'center' } }, // European countries centered
				// 	body: [
				// 		{ europe: 'Sweden', america: 'Canada', asia: 'China' },
				// 		{ europe: 'Norway', america: 'Mexico', asia: 'Japan' }
				// 	],
				// 	columns: [
				// 		{ header: 'Pro', dataKey: 'europe' },
				// 		{ header: 'Asia', dataKey: 'asia' }
				// 	]
				// });




				autoTable(doc, {
					head : [['Produto', 'Quantidade', 'Subtotal']],
					margin : {top : 30},

						


					body : 	[[	this.body[0] ], [	this.body[1]]  , [	this.body[2] ] , [	this.body[0] ], [	this.body[1]]  , [	this.body[2] ]
					
					]
				})

				 doc.save('relatorio.pdf');
				
			},

			info(val) {
				alert(val || 'Sem Observacão');
			}
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
				let dateCreated = new Date(val.seconds * 1000);
				return (
					dateCreated.getDate() +
					' de ' +
					months[dateCreated.getMonth()] +
					' de ' +
					dateCreated.getFullYear()
				);
			}
		}
	};
</script>

<style scoped>
	.active-class {
		background: rgb(240, 240, 240);
	}
</style>
