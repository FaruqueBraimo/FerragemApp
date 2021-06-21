<template>
	<div class="q-pa-md">
		{{ prod }}
		<q-markup-table class="q-pa-md" bordered square id="table">
			<thead class="bg-teal text-white">
				<tr>
					<th class="text-left">Artigo</th>
					<th class="text-right">Quantidade</th>
					<th class="text-right">Preço</th>
					<th class="text-right">Subtotal</th>
					<th class="text-right">Balconista</th>
					<th class="text-right">Data de Venda</th>
				</tr>
			</thead>
			<tbody v-for="(sl, index) in sale" :key="index">
				<tr v-for="i in sl.products" :key="i">
					<td class="text-left">{{ i.name }}</td>
					<td class="text-right">{{ i.newQtd }}</td>
					<td class="text-right">
						{{ new Intl.NumberFormat().format(i.price_buy) }}
					</td>
					<td class="text-right">
						{{
							new Intl.NumberFormat().format(
								i.price_buy * i.newQtd
							)
						}}
					</td>
					<td class="text-right">
						{{ users[sl.details.salesMan].name || '' }}
					</td>
					<td class="text-right">{{ sl.createdAt | dateFormat }}</td>
				</tr>
			</tbody>
			<tbody class="bg-teal text-white">
				<tr>
					<td class="text-bold">Subtotais</td>
					<td class="text-right text-bold">
						{{ getTotalFilteredQtd }}
					</td>

					<td class="text-bold"></td>

					<td class="text-right text-bold">
						{{
							new Intl.NumberFormat().format(
								getTotalFilteredMoney
							)
						}}
						MT
					</td>
					<td class="text-bold"></td>
					<td class="text-bold"></td>
				</tr>
			</tbody>
		</q-markup-table>
		<div class="row">
			<div class="col">
				<q-btn
					color="primary"
					class="q-ma-md"
					unelevated
					icon="book"
					label="Imprimir"
					@click="onClick"
				/>
			</div>
			<div class="col q-pa-md">
				<download-excel
					class="q-px-md"
					:data="json_data"
					:fields="json_fields"
					worksheet="Produtos Cadastrados"
					name="vendas.xls"
				>
					<q-btn
						color="green-7"
						icon="save_alt"
						label="Excel"
						unelevated
					/>
				</download-excel>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>
<script>
import { mapActions, mapState } from 'vuex';
import Vue from 'vue';
import JsonExcel from 'vue-json-excel';

Vue.component('downloadExcel', JsonExcel);

export default {
	name: 'saleBodyComponent',
	props: ['sale', 'saleId'],
	components: {},
	data() {
		return {
			dialog: false,
			json_fields: {
				codigo: 'code',
				Produto: 'name',

				Quantidade: 'quantity',
				preco: 'price',
				subtotal: 'subtotal',
				Balconista: 'createdBy',
				dataVenda: 'data'
			},
			json_data: [],
			json_meta: [
				[
					{
						key: 'charset',
						value: 'utf-8'
					}
				]
			]
		};
	},
	computed: {
		...mapState('sale', ['sales']),

		...mapState('auth', ['users']),

		prod() {
			let product = {};
			let produtToJson = {};
			let count = 0;
			Object.keys(this.sale).map((element, index) => {
				count = index;
				produtToJson = this.sale[element].products;
				Object.keys(produtToJson).map((element2) => {
					const produtos = produtToJson[element2];
					this.json_data[count] = {
						code: produtos.code,
						name: produtos.name,

						quantity: produtos.newQtd,
						price: produtos.price_buy,
						subtotal: produtos.price_buy * produtos.newQtd,
						createdBy:
							this.users[this.sale[element].details.salesMan]
								.name,
						data: this.convertToDate(this.sale[element].createdAt)
					};
				});
			});

			return '';
		},
		getTotalFilteredMoney() {
			let money = 0;
			Object.keys(this.sale).forEach((element) => {
				let prod = ~~this.sale[element].details.total;

				money = money + prod;
			});
			return money;
		},

		getTotalFilteredQtd() {
			let money = 0;
			Object.keys(this.sale).forEach((element) => {
				let prod = this.sale[element].products;

				Object.keys(prod).forEach((key) => {
					let prod2 = prod[key];
					money = money + ~~prod2.newQtd;
				});
			});
			return money;
		}
	},
	mounted() {
		// console.log(this.sale)
	},
	methods: {
		...mapActions('settings', ['setGlobalConfirm']),
		...mapActions('sale', ['updatesale']),

		onClick() {
			this.$htmlToPaper('table');
		},

		convertToDate(val) {
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
