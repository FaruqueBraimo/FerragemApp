<template>
	<div class="q-pa-md">
		<div class=" row  q-pa-sm ">
			<div class=" col-3 row justify-left q-pt-xl q-mt-xl">
				{{ fetchUsers }}
				<div class="col ">
					<q-input
						v-model="codeProduct"
						dense
						debounce="300"
						placeholder="Pesquise pelo codigo"
						square
						filled
					>
						<template v-slot:append>
							<q-icon
								v-if="codeProduct !== ''"
								name="close"
								@click="codeProduct = ''"
								class="cursor-pointer"
							/>
						</template>
					</q-input>
				</div>

				<div class="col-2 justify-left">
					<q-btn
						color="primary"
						outline
						label="OK"
						@click="findProductByCode"
					/>
				</div>
			</div>

			<div class=" col-3 row q-pt-xl q-mt-xl q-pa-md">
				<div class="col">
					<q-input
						v-model="nameProduct"
						dense
						debounce="300"
						placeholder="Pesquise o nome do produto"
						square
						filled
					>
						<template v-slot:append>
							<q-icon
								v-if="nameProduct !== ''"
								name="close"
								@click="nameProduct = ''"
								class="cursor-pointer"
							/>
						</template>
					</q-input>
				</div>

				<div class="col-2">
					<q-btn
						color="primary"
						outline
						label="OK"
						@click="findProductByName"
					/>
				</div>
			</div>

			<div class=" col  q-pt-xl q-mt-xl q-pl-sm ">
				<q-select
					v-model="user"
					:options="OptionalUsers"
					dense
					label="Funcionário"
					filled
				/>
			</div>

			<div class="col-4 q-pa-md">
				<q-card class="my-card text-bold" flat>
					<q-card-section>
						<q-list bordered>
							<q-item>
								<q-item-section
									>Total em dinheiro :
								</q-item-section>
								<q-item-section>
									{{ sumTotals.sumMoney | 0 }} ,00 MT
								</q-item-section>
							</q-item>

							<q-item>
								<q-item-section
									>Total em produtos :
								</q-item-section>
								<q-item-section>
									{{ sumTotals.sumQtd | 0 }} UND
								</q-item-section>
							</q-item>
						</q-list>
					</q-card-section>
				</q-card>
			</div>
		</div>

		<q-markup-table>
			<thead>
				<tr>
					<th class="text-left text-bold">Codigo</th>
					<th class="text-left">producto</th>
					<th class="text-left">Quantidade</th>
					<th class="text-left">Preco Unitário</th>
					<th class="text-left">Subtototal</th>
					<th class="text-left">Remover</th>
				</tr>
			</thead>
			<tbody v-for="(product, index) in exportedProducts" :key="index">
				<tr>
					<td class="text-left">{{ product.code }}</td>

					<td class="text-left text-capitalize">{{ product.name }}</td>
					<td class="text-left">
						<addQuantity
							:quantity="product.newQtd"
							:id="index"
							:product="product"
						/>
					</td>
					<td class="text-left">{{ product.price_buy }} ,00 MT</td>

					<td class="text-left">{{ product.subtotal }} ,00 MT</td>

					<td>
						<q-btn
							color="red-5"
							size="xs"
							icon="close"
							unelevated
							@click="removeChecked(index)"
							round
						/>
					</td>
				</tr>
			</tbody>
		</q-markup-table>

		<div class="row justify-end q-pt-md">
			 <q-input
			 label="Observacão"
      filled
	  v-model="obs"
      autogrow
    />
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import addQuantity from './addQuantity';

	export default {
		props: ['product', 'productChecked'],
		data() {
			return {
				nameProduct: '',
				codeProduct: '',
				quantity: 1,
				user: '',
				OptionalUsers: [],
				obs : ""
			};
		},
		computed: {
			...mapGetters('checkedProduct', [
				'getCheckedProducts',
				'checkIncludes'
			]),

			...mapState('auth', ['users']),

			...mapState('checkedProduct', ['checkedProducts']),

			...mapState('expo', ['saleProduct']),
			...mapState('product', ['exportedProducts']),

			fetchUsers() {
				Object.keys(this.users).forEach((element, key) => {
					this.OptionalUsers.push({
						value: element,
						label: this.users[element].name
					});
					this.OptionalUsers.push('Outros/Externo');
				});
			},

			sumTotals() {
				let totals = {};
				let sumMoney = 0;
				let sumQtd = 0;

				Object.keys(this.exportedProducts).forEach((element, key) => {
					let product = this.exportedProducts[element];
					sumMoney = sumMoney + product.subtotal;
					sumQtd = sumQtd + ~~product.newQtd;

					totals.sumMoney = sumMoney;
					totals.sumQtd = sumQtd;
				});

				return totals;
			}
		},
		components: {
			addQuantity
		},
		mounted() {
			this.fetchUsers;
		},

		watch: {
			user(val) {
				this.$emit('user', val);
			},

			obs(val) {
				this.$emit('obs', val);
			}
		},

		methods: {
			...mapActions('product', ['addCheckedProducts', 'removeChecked']),

			addToCard(product) {
				this.$emit('addToCard', product);
			},

			findProductByName() {
				this.$emit('findProductByName', this.nameProduct.toLowerCase());
			},

			findProductByCode() {
				this.$emit('findProductByCode', this.codeProduct);
			},

			LocalIncrementQuantity(val) {
				let product = val;

				this.incrementQuantity({ id: val.id, updates: product });
			},

			LocalDecrementQuantity(val) {
				let product = val;
				//

				this.decrementQuantity({ id: val.id, updates: product });
			}
		}
	};
</script>
