<template>
	<div class="q-px-md">
		<div class=" row   ">
			<div class=" col-3 row justify-left q-pt-md q-mt-xl">
				{{ fetchCustumers }}   
				<div class="col ">
					<q-input
						disable
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
						disable
						label="OK"
						@click="findProductByCode"
					/>
				</div>
			</div>

			<div class=" col-3 row q-pt-xl q-mt-md q-pa-md">
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
					<div class="row">
						<autoComplete
							:product="searchProduct(saleProduct)"
							v-if="nameProduct !== ''"
						/>
					</div>
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

			<div class=" col  q-pt-xl q-mt-md q-pl-sm  ">
				<q-select
					v-model="user"
					:options="OptionalUsers"
					dense
					label="Cliente"
					filled
				>
					<template v-slot:append>
						<q-btn round dense flat icon="add" @click.stop />
					</template>
				</q-select>
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
									{{ sumTotals(productToSale)  - this.desc|| 0 }} ,00 MT
								</q-item-section>
							</q-item>

							<q-item>
								<q-item-section>Valor Dado : </q-item-section>
								<q-item-section>
									{{ value || 0 }} ,00 MT
								</q-item-section>
							</q-item>

							<q-item class="text-deep-orange">
								<q-item-section>Troco : </q-item-section>
								<q-item-section>
									{{ getChance || 0 }} ,00 MT
								</q-item-section>
							</q-item>
						</q-list>
					</q-card-section>
				</q-card>
			</div>

			{{ findProductForSale }} 		<span class="text-white">{{UpdateView}}</span>

		</div>

		<q-markup-table>
			<thead>
				<tr>
					<th class="text-left text-bold">Codigo</th>
					<th class="text-left">producto</th>
					<th class="text-center text-bold">
						Tipo de Venda || Quantidade
					</th>
					<th class="text-left">Preco</th>
					<th class="text-left">Subtototal</th>
					<th class="text-left">Remover</th>
				</tr>
			</thead>
			<tbody v-for="(product, index) in productToSale" :key="index">
				<tr>
					<td class="text-left">{{ product.code }}</td>

					<td class="text-left text-capitalize">
						{{ product.name }}
					</td>
					<td class=" row text-center">
						<addQuantity
							class="col-9 "
							:id="index"
							:product="product"
							@updateQuantity="updateQuantity" 
						/>
						<div class="col-2 justify-left">
									<q-btn color="primary" no-caps flat label="Recalcular" @click="ok(index)" />


						</div>

					</td>
					<td class="text-left">
						{{
							 product.price_buy
						}}
						,00 MT
					</td>

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
			<div class="col-3 q-px-sm">
				<!-- <q-input label="Valor dado" class="text-center text-bold " filled v-model="value" autogrow /> -->

				<q-toolbar class="bg-blue-grey text-white rounded-borders">
					<q-avatar class="gt-xs">
						<q-icon name="attach_money" />
					</q-avatar>

					<q-space />

					<q-input
						dark
						dense
						standout
						v-model="value"
						type="number"
						label=" Valor Dado"
						input-class="text-right"
						class="q-ml-md q-pa-sm"
					>
					</q-input>
				</q-toolbar>
			</div>

			<div class="col-1 q-mt-xs">
				<q-input
					label="Desconto"
					type="number"
					filled
					v-model="desc"
					dense
					input-class="text-right "
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';

	import addQuantity from '../products/addQuantity';
	import autoComplete from '../products/autoComplete';

	export default {
		props: ['product', 'productChecked', 'disable'],
		data() {
			return {
				nameProduct: '',
				codeProduct: '',
				quantity: 1,
				user: '',
				OptionalUsers: [],
				value: 0,
				change: '',
				desc: 0,
				price: '',
				totals: {},
				UpdateView   : 0

			};
		},
		computed: {
			...mapGetters('checkedProduct', [
				'getCheckedProducts',
				'checkIncludes'
			]),

			...mapState('customer', ['customers']),
			...mapGetters('expo', ['findProductForSale', 'searchProduct', 'sumTotals']),

			...mapState('checkedProduct', ['checkedProducts']),

			...mapState('expo', ['saleProduct', 'productToSale']),
			...mapState('product', ['exportedProducts']),

			getChance() {
				let change = 0;
				const total = this.sumTotals(this.productToSale) - this.desc

				if (this.value >= total ) {
					change = this.value - total;
					this.$emit('disable', !this.disable);
				} else {
				}
				return change;
			},
			fetchCustumers() {
				Object.keys(this.customers).forEach((element, key) => {
					this.OptionalUsers.push({
						value: element,
						label: this.customers[element].name
					});
				});
				this.OptionalUsers.push();
			},

		
		},
		components: {
			addQuantity,
			autoComplete
		},
		mounted() {
			this.fetchCustumers;
		},

		watch: {
			user(val) {
				this.$emit('user', val);
			},

		

			value(val) {
				this.$emit('value', {
					value: ~~val,
				});
			},
			nameProduct(val) {
				this.$emit('findProductByName', val.toLowerCase());
			}


			

		},

		updated() {
			
		const total = this.sumTotals(this.productToSale) - this.desc
		
			if( total > 0) {
				this.$emit('total',  total);

			}	

		},

		methods: {
			...mapActions('expo', ['addCheckedProducts', 'removeChecked' , 'updateQtdProduct']),

			addToCard(product) {
				this.$emit('addToCard', product);

			},

			ok(val) {

					const total = this.sumTotals(this.productToSale) - 5
					this.UpdateView = total
			},

			updateQuantity(val){
					this.updateQtdProduct({
							id: val.id,
							updates: {
								newQtd:val.qtd,
								priceType : val.price ,
								subtotal:val.price * val.qtd
							}
						});
						
							
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
