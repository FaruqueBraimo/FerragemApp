<template>
	<div class="row items-center justify-center">
		<q-card class="q-pa-sm" square bordered style="width: 60%">
			<div class="form-header">
				<p class="text-h6 text-center ">
					Preencha os campos abaixo para registar um produto
					{{ fetchCategories  }} {{fetchProviders}}
				</p>
			</div>
			<q-form
				@submit="onSubmit"
				@reset="onReset"
				class="q-gutter-md q-py-md"
			>
				<div class="row">
					<div class="col-6 q-px-sm">
						<q-input
							square
							filled
							label="Nome do producto"
							v-model="saveObject.name"
							lazy-rules
						/>
					</div>
					<div class="col-6 q-px-sm">
						<q-select
							label="Categoria do Produto"
							square
							filled
							:options="optionalcategory"
							v-model="saveObject.category"
						/>
					</div>
					<div class="col-md-6 col-xs-12 q-pa-sm">
						<q-input
							square
							filled
							type="number"
							label="Preco do producto"
							v-model="saveObject.price"
							lazy-rules
						/>
					</div>
					<div class="col-md-6  q-pa-sm">
						<q-select
							label="Fornecedor do Produto"
							square
							filled
							:options="Optionalprovider"
							v-model="saveObject.provider"
						/>
					</div>
					<div class="col-6  q-pa-sm">
						<q-input
							square
							filled
							type="number"
							label="Quantidade do producto"
							v-model="saveObject.quantity"
							lazy-rules
						/>
					</div>

					<div class="col-6  q-pa-sm">
						<q-input
							square
							filled
							type="number"
							label="Preço de compra "
							v-model="saveObject.price_buy"
							lazy-rules
						/>
					</div>
					
					<div class="col-6  q-pa-sm">
						 <q-input filled v-model="date" mask="date" label="Valido até">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="saveObject.expires" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
					</div>
					<div class="col-6  q-pa-sm">
						<q-input
							square
							filled
							label=" Descrição "
							autogrow
							class=""
							v-model="saveObject.description"
							lazy-rules
						/>
					</div>
				</div>
				<div class="row text-center">
					<div class="col-6 q-pa-md">
						<q-btn
							label="Registar"
							size="md"
							type="submit"
							color="primary"
							:loading="loading"
							unelevated
							class="full-width "
						/>
					</div>

					<div class="col-6 q-pa-md">
						<q-btn
							label="Limpar"
							size="md"
							type="reset"
							color="deep-orange"
							unelevated
							class="full-width "
						/>
					</div>
				</div>
			</q-form>
		</q-card>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'ProductFormComponent',
		data() {
			return {
				date: 'AAAA/MM/DD',
				optionalcategory : [],
				Optionalprovider : [{label : 'Nenhum'}],
				utility: ['Venda', 'Uso Interno'],
				saveObject: {
					name: '',
					category: '',
					price: '',
					utility: '',
					quantity: '',
					expires: ''
				}
			};
		},
		computed: {
			...mapState('product', ['products', 'loading']),
			...mapState('category', ['categories', ]),
			...mapState('provider', ['providers', ]),


			fetchCategories() {
				Object.keys(this.categories).forEach((element, key) => {
					this.optionalcategory.push({
						value: element,
						label: this.categories[element].name
					});
				});

				return '';
			},

				fetchProviders() {
				Object.keys(this.providers).forEach((element, key) => {
					this.Optionalprovider.push({
						value: element,
						label: this.providers[element].name
					});
				});

				return '';
			}
		},

		methods: {
			onSubmit() {
				let product = {};
				product.category = this.saveObject.category;
				product.name = this.saveObject.name;
				product.price = this.saveObject.price;
				product.quantity = this.saveObject.quantity;
				product.provider = this.saveObject.provider;
				product.price_buy = this.saveObject.price_buy;
				product.description = this.saveObject.description
				product.expires = this.saveObject.expires


				this.$emit('emitData', product);

				setTimeout(() =>{ 
					this.onReset();		
				}, 1000);

				


			},
			onReset() {
				this.saveObject = {};
			}
		}
	};
</script>

<style scoped>
	* {
		color: #585858;
	}
	button,
	.form-header {
		margin: 1rem;
	}
</style>
