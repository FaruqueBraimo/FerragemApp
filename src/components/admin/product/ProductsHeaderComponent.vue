<template>
	<thead>
		<tr>
			<th colspan="8">
				<div class="row no-wrap items-center">
					<q-img
						style="width: 70px"
						:ratio="1"
						class="rounded-borders"
						src="https://img.icons8.com/nolan/64/product.png"
					/>

					<div class="text-h6 col-1 text-secondary">Produtos</div>
					<div class=" col  q-ml-xl justify-right text-right">
						<q-select
							dense
							label="Filtrar Por Categoria do Produto"
							square
							v-model="filterCategory"
							filled
							:options="optionalcategory"
						/>
						
					</div>
					<div class=" col q-pl-sm ">
						<template>
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

						</template>
						
						
					</div>
				<q-btn color="primary"   outline label="OK" @click="emitCodeData" />




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

				<q-btn color="primary"   outline label="OK" @click="emitData" />



				</div>
			</th>
		</tr>

		<tr class="text-bold" style="font-weight: bold">
			<th class="text-center text-bold" style="font-weight: bold">
				Codigo 
			</th>
				<th class="text-center text-bold" style="font-weight: bold">
				Referência
			</th>

			<th class="text-left text-bold" style="font-weight: bold">Nome</th>
			<th class="text-left text-bold" style="font-weight: bold">
				Categoria
			</th>
			<th class="text-left text-bold" style="font-weight: bold">
				Quantidade no Stock
			</th>
			<th class="text-left text-bold" style="font-weight: bold">
				Preco de Venda
			</th>

			<th class="text-left " style="font-weight: bold">Forncedor</th>

		
			<th class="text-center text-bold" style="font-weight: bold">
				Acção
			</th>
		</tr>
	</thead>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'ProductHeaderComponent',

		data() {
			return {
				optionalcategory: ['Todas'],
                filterCategory :'',
				search: '',
				referenceSearch : ''
			};
		},
		computed: {
			...mapState('category', ['categories']),

		
		},
		methods: {
			...mapActions('product', ['listenProductRealTimeChanges']),

			emitData(){
				this.$emit('referenceFilter', this.referenceSearch)
			},

			emitCodeData(){
						this.$emit('productFilter', this.search)


			},

				fetchCategories() {
				Object.keys(this.categories).forEach((element, key) => {
					this.optionalcategory.push({
						value: element,
						label: this.categories[element].name
					});
				});

			}
		},
		mounted() {
			this.fetchCategories();
		},

		watch: {
			search(val) {
				if (!val) {
					this.listenProductRealTimeChanges();
				}
				// else {
				// 	this.$emit('productFilter', this.search)

				// }
			}
					,
			referenceSearch(val) {
				if (!val) {
					this.listenProductRealTimeChanges();
				}
			},


			

			filterCategory(val) {
				if (val) {
				this.$emit('productFilterCategory', this.filterCategory)}
			}
		}
	};
</script>

<style scoped></style>
