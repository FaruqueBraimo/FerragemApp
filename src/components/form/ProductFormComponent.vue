<template>
	<div class="flex fixed flex-center"> 
	<div class="row justify-center ">
		<p class="text-h6 text-center q-pb-md text-center ">
			Preencha os campos abaixo para registar um produto
			{{ fetchCategories }} {{ fetchProviders }}  
		</p>
		
		<q-card square bordered>
			<q-tabs
				v-model="tab"
				dense
				inline-label
				class="text-grey q-pa-sm"
				active-color="primary"
				indicator-color="primary"
				align="justify"
				narrow-indicator
			>
				<q-tab name="mails" icon="info" label="Detalhes" />
				<q-tab name="alarms" icon="attach_money" label="Preços" />
				<q-tab name="movies" icon="store" label="Stock" />
			</q-tabs>

			<q-separator />

			<q-tab-panels v-model="tab" animated>
				<q-tab-panel name="mails">
					<div class="row q-px-sm">
						<!-- <p class="text-h6 text-primary text-bold"> Detalhes do producto </p> -->
						<div class="col-6 ">
							<q-input
								square
								filled
								dense
								v-model="code"
								type="number"
								prefix="SA--"
								placeholder="Codigo"
								lazy-rules
							:rules="[
								val =>
									(val !== null && val !== '') ||
									'Por favor insira o codigo'
							]"
											>
							</q-input>
						</div>

						<div class="col-6 q-px-sm">
							<q-input
								square
								filled
								dense
								label="Nome do producto"
								v-model="name"
												:rules="[
								val =>
									(val !== null && val !== '') ||
									'Por favor insira o nome'
							]"
			
							/>
						</div>

						<div class="col-6 q-py-sm">
							<q-select
								dense
								label="Categoria do Produto"
								square
								filled
								:options="optionalcategory"
								v-model="category"
												:rules="[
								val =>
									(val !== null && val !== '') ||
									'Por favor insira a categoria'
							]"
			
							/>
						</div>

						<div class="col-6 q-pa-sm">
							<q-select
								label="Fornecedor do Produto"
								square
								dense
								filled
								:options="Optionalprovider"
								v-model="provider"
												:rules="[
								val =>
									(val !== null && val !== '') ||
									'Por favor insira o fornecedor'
							]"
			
							/>
						</div>

						<div class="col-6 q-py-sm">
							<q-input
								square
								filled
								dense
								label="Quantidade"
								v-model="quantity"
								lazy-rules
												:rules="[
								val =>
									(val !== null && val !== '') ||
									'Por favor insira a quantidade'
							]"
			
							/>
						</div>

						<div class="col-6 q-pa-sm">
	<q-input filled v-model="expires" placeholder='Prazo de Validade' dense>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="expires" mask="DD-MM-YYYY "  />
          </q-popup-proxy>
        </q-icon>
      </template>
	  
	  </q-input>
						</div>
					</div>
				</q-tab-panel>

				<q-tab-panel name="alarms">
					<div class="row q-px-sm">
						<!-- <p class="text-h6 text-primary text-bold"> Detalhes do producto </p> -->
						<div class="col-6 ">
							<q-input
								square
								filled
								dense
								type="number"
								label="Preco de Compra"
								v-model="price_payd"
							/>
						</div>

						<div class="col-6 q-px-sm">
							<q-input
								square
								filled
								type="number"
								label="Preco de Venda"
								v-model="price_buy"
								dense
							/>
						</div>

						<div class="col-6 q-py-sm">
							<q-input
								square
								filled
								type="number"
								label="Iva"
								dense
								v-model="iva"
								
							/>
						</div>

						<div class="col-6 q-pa-sm">
							<q-input
								square
								filled
								type="number"
								label="Desconto de Iva"
								v-model="discount_iva"
							
								dense
							/>
						</div>

						<div class="col-6 q-py-sm">
							<q-input
								square
								filled
								disable
								dense
								label=" Lucro"
								v-model="profit"
							/>
						</div>

						<div class="col-6 q-pa-sm">
							<q-input
								square
								filled
								disable
								dense
								label="Margem de Lucro"
								v-model="profitMargin"
							/>
						</div>
					</div>
				</q-tab-panel>

				<q-tab-panel name="movies" style="min-weight:1000px">
					<div class="row q-px-sm" style="min-weight:1000px">
						<!-- <p class="text-h6 text-primary text-bold"> Detalhes do producto </p> -->
						<div class="col-6 ">
							<q-input
								square
								filled
								dense
								label="Roptura de Stock"
								v-model="stockBreak"
								type="number"
									lazy-rules
												:rules="[
								val =>
									( val > ~~quantity ) ||
									'Por for basea-se na quantidade total do produto'
							]"
							>
							</q-input>
						</div>

						<div class="col-6 q-px-sm">
							<q-input
								square
								filled
								dense
								label="Quantidade que vai ao balcão"
								v-model="qtdBalcony"
								type="number"
								lazy-rules
												:rules="[
								val =>
									( val < ~~quantity ) ||
									'Por for basea-se na quantidade total do produto'
							]"
							>
							</q-input>
						</div>

						<div class="col-6 q-py-sm">
							<q-input
								square
								filled
								dense
								label="Quantidade que fica no armazêm"
								v-model="qtdWarehouse"
								disable
								type="number"
							>
							</q-input>
						</div>

						<div class="col-6 q-pa-sm">
							<q-input
								label="Observacoes gerais sobre o produto"
								square
								dense
								filled
								v-model="description"
							/>
						</div>

						<div class="col-6 q-py-sm text-white">
							ddddddddddddddddddddd
						</div>

						<div class="col-6 q-pa-sm  text-white">
							;ddddddddddddddd
						</div>
					</div>
				</q-tab-panel>
			</q-tab-panels>

			<div class="row text-center">
				<div class="col-6 q-pa-md">
					<q-btn
						:label="!productData.data ? 'Registar' : 'Actualizar'"
						size="md"
						@click="onSubmit"
						type="submit"
						color="primary"
						:disable='disable'
						:loading="loading"
						unelevated
						class="full-width "
					/>
				</div>

				<div class="col-6 q-pa-md">
					<q-btn
						label="Limpar"
						size="md"
						@click="onReset"
						type="reset"
						color="deep-orange"
						unelevated
						class="full-width "
					/>
				</div>
			</div>
		</q-card>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState, mapActions } from 'vuex';
	export default {
		name: 'ProductFormComponent',
		props: ['productData'],
		data() {
			return {
				date: 'AAAA/MM/DD',
				tab: 'mails',
				optionalcategory: [],
				Optionalprovider: [{ label: 'Nenhum' }],
				utility: ['Venda', 'Uso Interno'],
				name: '',
				disable : true,
				category : '',
				price : '',
				utility: '',
				quantity: '',
				code: '',
				expires: '',
				profitMargin: '',
				price_buy: 0,
				price_payd: 0,
				iva: '',
				discount_iva: 0,
				provider : '',
				profit : '',
				qtdBalcony : '',
				qtdWarehouse : '',
				stockBreak : '',
				description : '',
			};
		},
		mounted() {
			if(this.productData.data) {
			this.name = this.productData.data.name;
			this.category = this.productData.data.category;
			this.provider = this.productData.data.provider;
			this.quantity = this.productData.data.quantity;
			this.expires = this.productData.data.expires;
			this.price_buy = this.productData.data.price_buy;
			this.price_payd = this.productData.data.price_payd;
			this.description = this.productData.data.description;
			this.iva = this.productData.data.iva;
			this.discount_iva = this.productData.data.discount_iva;
			this.qtdBalcony = this.productData.data.qtdBalcony;
			this.qtdWarehouse = this.productData.data.qtdWarehouse;
			this.stockBreak = this.productData.data.stockBreak;
			this.code = this.productData.data.code;
			this.profitMargin = this.productData.data.profitMargin;
			
			}
			
		},
		computed: {
			...mapState('product', ['products', 'loading']),
			...mapState('category', ['categories']),
			...mapState('provider', ['providers']),
			...mapState('auth', ['users', 'userAuth',]),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),

			
			waitingForProductData() {
				if (this.productData) {
				}
			},
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
			/// WE also use this computed proprities as any opportunity for realize calculus
			if( this.qtdBalcony) {
						this.qtdWarehouse = ~~ +this.quantity - ~~this.qtdBalcony
			}
			if(this.name !== '' && this.category !== '' && this.quantity !== '' && this.provider !== '' && this.price_buy !== '' && this.price_payd !== '' && this.stockBreak !== ''  && this.qtdBalcony !==  '') {
				this.disable = false
			}

				if(this.price_buy !=0 &&  this.price_payd !=0 ) {
				this.profit = (this.price_buy - this.price_payd) + ' MZN , Sem o Iva' ;
		       	let profitLocal = ( (this.price_buy - this.price_payd)/(this.price_payd) )
				this.profitMargin =   profitLocal.toFixed(3) * 100   + ' % '  + ' , Sem o Iva'
				}
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
			...mapActions('product', ['updateProduct']),
			onSubmit() {
				let product = {};
					product.category = this.category;
					product.code = this.code;
					product.name = this.name;
					product.iva = this.iva ;
					product.price_payd = this.price_payd;
					product.quantity = this.quantity;
					product.provider = this.provider;
					product.price_buy = this.price_buy;
					product.description = this.description;
					product.expires = this.expires;
					product.iva = this.iva;
					product.profit = this.profit;
					product.profitMargin = this.profitMargin;
					product.createdBy = this.getUserAuth.id
		
					product.discount_iva = this.discount_iva;
					product.qtdBalcony = this.qtdBalcony;
					product.qtdWarehouse = this.qtdWarehouse;
					product.stockBreak = this.stockBreak;
					
				if (this.productData.data) {
					delete product.createdBy 
					product.updatedBy = this.getUserAuth.id
					this.updateProduct({
						id: this.productData.id,
						updates: product
					});
					this.$router.push('/products');
				} else {
					
					this.$emit('emitData', product);
					setTimeout(() => {
						this.onReset();
					}, 1000);
				}
			},
			onReset() {
			this.name = '';
			this.category = '';
			this.provider = '';
			this.quantity = '';
			this.expires = '';
			this.price_buy = '';
			this.price_payd = '';
			this.description = '';
			this.iva = '';
			this.discount_iva = '';
			this.qtdBalcony = ' ';
			this.qtdWarehouse = '';
			this.stockBreak = '';
			this.code = '';
			this.profit = '';
			this.profitMargin = '';
			}
		},
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