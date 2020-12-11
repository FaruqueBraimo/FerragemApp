<template>
	<div class="q-pa-md">
		<div class=" row q-pl-sm ">
			<div class="row col-6 ">
				<div class="col">
					<q-input
						v-model="search"
						dense
						debounce="300"
						placeholder="Pesquise o nome do produto"
						square
						filled
					>
						<template v-slot:append>
							<q-icon
								v-if="search !== ''"
								name="close"
								@click="search = ''"
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
						@click="emitCodeData"
					/>
				</div>
			</div>
		</div>

        

		<div class=" col q-pl-sm ">
			<template>
				<q-input
					v-model="referenceSearch"
					dense
					debounce="300"
					placeholder="Pesquise pelo codigo"
					square
					filled
				>
					<template v-slot:append>
						<q-icon
							v-if="referenceSearch !== ''"
							name="close"
							@click="referenceSearch = ''"
							class="cursor-pointer"
						/>
					</template>
				</q-input>
			</template>
		</div>

		<q-btn color="primary" outline label="OK" @click="emitData" />

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
			<tbody v-for="(product, index) in checkedProducts" :key="index">
				<tr>
					<td class="text-left">17895</td>

					<td class="text-left">{{ product.payload.name }}</td>
					<td class="text-left">17% * 56</td>
					<td class="text-left">
						<addQuantity
							:quantity="product.payload.qtdUnit"
							:product="product.payload"
							:id="product.payload.id"
						/>
					</td>
					<td class="text-left">
						{{ product.payload.price }} ,00 MT
					</td>
					<td class="text-left">
						{{ product.payload.subtotal }} ,00 MT
					</td>
					<td>
						<q-btn
							color="red-5"
							size="xs"
							icon="close"
							unelevated
							@click="$emit('removeChecked', product.payload.id)"
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
				search: '',
				referenceSearch: ''
			};
		},
		computed: {
			...mapGetters('checkedProduct', [
				'getCheckedProducts',
				'checkIncludes'
			]),
			...mapState('checkedProduct', ['checkedProducts'])
		},
		components: {
			addQuantity
		},

		methods: {
			addToCard(product) {
				this.$emit('addToCard', product);
			},

			emitData() {
				this.$emit('referenceFilter', this.referenceSearch);
			},

			...mapActions('checkedProduct', [
				'addCheckedProducts',
				'removeChecked',
				'incrementQuantity',
				'decrementQuantity'
			]),

			...mapActions('product', ['addCheckedProducts', 'removeChecked']),

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
