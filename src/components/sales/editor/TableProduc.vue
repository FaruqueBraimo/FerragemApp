<template>
	<div class="q-pa-md">
		<div class=" row  q-pa-md ">
			<div class="row col ">

				{{saleProduct}}
				<div class="col">
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

				<div class="col">
					<q-btn
						color="primary"
						outline
						label="OK"
						@click="findProductByCode"
					/>
				</div>
			</div>
	
		<div class="col-3 justify-left">
		</div>
	<div class="row col ">
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

				<div class="col">
					<q-btn
						color="primary"
						outline
						label="OK"
						@click="findProductByName"
					/>
				</div>
			</div>
	
			</div>

		<q-markup-table>
			<thead>
				<tr>
					<th class="text-left text-bold">Codigo</th>
					<th class="text-left">producto</th>
					<th class="text-left">Iva</th>
					<th class="text-left">Quantidade</th>
					<th class="text-left">Preco Unit</th>
					<th class="text-left">Subtototal</th>
					<th class="text-left">Remover</th>
				</tr>
			</thead>
			<tbody v-for="(product, index) in saleProduct" :key="index">
				<tr>
					<td class="text-left">{{product.product.code}}</td>

					<td class="text-left">{{ product.product.label }}</td>
					<td class="text-left">{{product.product}}</td>
					<td class="text-left">
						<addQuantity
							:quantity="product.quatity"
							:product="product.product"
							:id="product.product.value"
						/>
					</td>
					<td class="text-left">
						{{ product.product.price }} ,00 MT
					</td>
					<td class="text-left">
						{{ product.price*9 }} ,00 MT
					</td>
					<td>
						<q-btn
							color="red-5"
							size="xs"
							icon="close"
							unelevated
							@click="$emit('removeChecked', product.product.value)"
							round
						/>
					</td>
				</tr>
			</tbody>
		</q-markup-table>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import addQuantity from '../products/addQuantity';

	export default {
		props: ['product', 'productChecked'],
		data() {
			return {
				nameProduct: '',
				codeProduct: ''
			};
		},
		computed: {
			...mapGetters('checkedProduct', [
				'getCheckedProducts',
				'checkIncludes'
			]),
		
		  ...mapState('checkedProduct', ['checkedProducts']),

		   ...mapState('expo', ['saleProduct']),

		},
		components: {
			addQuantity
		},

		methods: {

						...mapActions('product', ['addCheckedProducts', 'removeChecked']),

			addToCard(product) {
				this.$emit('addToCard', product);
			},

			findProductByName() {
				this.$emit('findProductByName', this.nameProduct );
			},


			findProductByCode(){
						this.$emit('findProductByCode', this.codeProduct)


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
