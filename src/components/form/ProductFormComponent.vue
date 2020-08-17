<template>
	<div class="flex fixed flex-center">
		<div class="row justify-center ">
			<p class="text-h6 text-center q-pb-md text-center ">
				Preencha os campos abaixo para registar um produto
				{{ calculusMath }} {{	referenceStatus}}
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
									disable
									
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
								>
		<template v-slot:append>
          <q-btn round dense flat icon="add" @click='reloadProviders' />
        </template>
      </q-select>
								</q-select>
							</div>

							<div class="col-6 q-py-sm">
								<q-input
									square
									filled
									dense
									placeholder = 'ST-XYZ...'
									label="Referência"
									v-model="reference"
									lazy-rules
									:rules="[
										val =>
											(val !== null && val !== '') ||
											'Por favor insira a referencia'
									]"
								/>
							</div>

							<div class="col-6 q-pa-sm">
								<q-input
									filled
									v-model="expires"
									placeholder="Prazo de Validade"
									dense
								>
									<template v-slot:append>
										<q-icon
											name="event"
											class="cursor-pointer"
										>
											<q-popup-proxy
												transition-show="scale"
												transition-hide="scale"
											>
												<q-date
													v-model="expires"
													mask="DD-MM-YYYY "
												/>
											</q-popup-proxy>
										</q-icon>
									</template>
								</q-input>
							</div>

							<div class="col-12 ">
								<q-input
									square
									filled
									dense
									label="SubCategoria"
									v-model="subCategory"
									lazy-rules
									:rules="[
										val =>
											(val !== null && val !== '') ||
											'Por favor insira a categoria'
									]"
								/>
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
									label="Iva"
									dense
									v-model="iva"
									disable
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
									disable
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
							<div class="col-12 ">
								<q-input
									square
									filled
									dense
									label="Quantidade Total"
									v-model="quantity"
									type="number"
									lazy-rules
									:rules="[
										val =>
											(val !== null && val !== '') ||
											'Por favor insira a quantidade'
									]"
								/>
							</div>
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
											val <= ~~quantity ||
											'Quantidade Superior a quantidade total'
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
											val < ~~quantity ||
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
						</div>
					</q-tab-panel>
				</q-tab-panels>

				<div class="row text-center">
					<div class="col-6 q-pa-sm">
						<q-btn
							:label="
								!productData.data ? 'Registar' : 'Actualizar'
							"
							size="md"
							@click="onSubmit"
							type="submit"
							color="primary"
							:disable="disable"
							:loading="loading"
							unelevated
							class="full-width "
						/>
					</div>

					<div class="col-6 q-pa-sm">
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
			<div>  </div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState, mapActions } from 'vuex';
	import { date } from 'quasar';
import { watch } from '@xkeshi/vue-barcode';

	export default {
		name: 'ProductFormComponent',
		props: ['productData'],
		data() {
			return {
				date: 'AAAA/MM/DD',
				tab: 'mails',
				refCode:"",
				optionalcategory: [],
				Optionalprovider: [{ label: 'Nenhum' }],
				utility: ['Venda', 'Uso Interno'],
				name: '',
				disable: true,
				category: '',
				price: '',
				utility: '',
				quantity: '',
				code: '',
				expires: '',
				profitMargin: '',
				price_buy: 0,
				price_payd: 0,
				iva: '17%',
				discount_iva: 0,
				provider: '',
				profit: '',
				qtdBalcony: '',
				qtdWarehouse: '',
				stockBreak: '',
				description: '',
				reference: '',
				subCategory: '',
				referenceStatus: '',
				referenceStatusUpdate:''
			};
		},
		mounted() {
			this.fetchCategories;
			this.fetchProviders;
			this.getAllProducts()

			if (this.productData.data) {
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
				this.reference = this.productData.data.reference;
				this.profitMargin = this.productData.data.profitMargin;
				this.subCategory = this.productData.data.subCategory;
			} else {
				Object.keys(this.notifications).length > 0
					? Object.keys(this.notifications).forEach(
							(element, key) => {
								this.code = `KM-${this.notifications[element]
									.code + 1}`;
							}
					  )
					: (this.code = 'KM-1');
			}
		},
		computed: {
			...mapState('product', ['products', 'loading']),
			...mapState('category', ['categories']),
			...mapState('provider', ['providers']),
			...mapState('notification', ['notifications']),

			...mapState('auth', ['users', 'userAuth']),
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
				Object.keys(this.providers).forEach((element, key) => {
					this.Optionalprovider.push({
						value: element,
						label: this.providers[element].name
					});
				});
				return '';
			},

			calculusMath() {
				/// WE also use this computed proprities as any opportunity for realize calculus
				
				let qtdWrhCheck = ~~this.quantity - ~~this.qtdBalcony
				if (qtdWrhCheck > 0) {
					this.qtdWarehouse = ~~+this.quantity - ~~this.qtdBalcony;
				}
				if (
					this.name !== '' &&
					this.category !== '' &&
					this.quantity !== '' &&
					this.provider !== '' &&
					this.price_buy !== '' &&
					this.price_payd !== '' &&
					this.stockBreak !== '' &&
					this.qtdBalcony !== '' &&
					this.description !== '' &&
					this.discount_iva !== '' &&
					this.qtdBalcony !== '' &&
					this.qtdWarehouse !== '' &&
					this.stockBreak !== '' &&
					this.profit !== '' &&
					this.profitMargin !== '' &&
					this.reference !== '' &&
					this.subCategory !== ''
				) {
					this.disable = false;
				}

					//Iva validation
					let dscIva = (this.price_payd * 0.17);
				this.discount_iva = dscIva.toFixed(2)

				if (this.price_buy != 0 && this.price_payd != 0) {
					this.profit =
						(this.price_buy - this.price_payd) - 0.17 ;
					let profitLocal =
						(this.price_buy - this.price_payd) / this.price_payd;
						let pftM = profitLocal.toFixed(3) * 100 
					this.profitMargin =
						pftM.toFixed(2) + ' % ' ;
				}

				
				const dateReturn = date.extractDate(
					this.expires,
					'DD-MM-YYYY '
				);

				// Reference validation
					Object.keys(this.products).forEach((element, key) => {
							let prod = this.products[element];
							
							if (prod.reference == this.reference) {
								this.referenceStatus = true;
							}
							else {
							}
						});

					if(this.productData.data) {

					
					Object.keys(this.products).forEach((element, key) => {
							let prod2 = this.products[this.productData.id];
							let prod3 = this.products[element]
							let prodGeneral = {}	

							if(prod2.code !== prod3.code) {
								prodGeneral = 	prod3

							if (prodGeneral.reference == this.reference) {
								this.referenceStatusUpdate = true;
							}
							
							else {

							}
	
							}							
							console.log(prodGeneral)


						});



								}


				// Data expires validation
				const dateNow = new Date();
				if (this.expires != '' && dateReturn < dateNow) {
					this.expires = '';
					this.$q.dialog({
						title: 'Data Inválida',
						message: `A data Introduzida é inferior a data actual. 
						`,
						ok: 'Sim'
					});
				}
			}
		},
		methods: {
			...mapActions('product', ['updateProduct','getAllProducts']),
			...mapActions('notification', [
				'addNotification',
				'editNotification'
			]),
						...mapActions('provider', ['getProviderData']),

			reloadProviders() {
				this.Optionalprovider = [];
				this.fetchProviders;
				this.getProviderData();

			},


			onSubmit() {
				let product = {};
				product.category = this.category;
					 this.refCode = 	this.reference.toLowerCase().substring(0, 2);

				product.name = this.name;
				product.iva = this.iva;
				product.price_payd = this.price_payd;
				product.quantity = this.quantity;
				product.provider = this.provider;
				product.price_buy = this.price_buy;
				product.description = this.description;
				product.expires = this.expires;
				product.iva = this.iva;
				product.reference = this.reference;
				product.subCategory = this.subCategory;

				product.profit = this.profit;
				product.profitMargin = this.profitMargin;
				product.createdBy = this.getUserAuth.id;

				product.discount_iva = this.discount_iva;
				product.qtdBalcony = this.qtdBalcony;
				product.qtdWarehouse = this.qtdWarehouse;
				product.stockBreak = this.stockBreak;

				if (this.productData.data) {
					delete product.createdBy;
					product.updatedBy = this.getUserAuth.id;
					
						if (this.referenceStatusUpdate === true) {
							this.$q
								.dialog({
									title: 'Referência Repetida',
									message:
										'Existe um produto com esta refêrencia, por favor mude ',
									ok: 'Está bem',
									cancel: false
								})
								.onOk(() => {
								
								});
						} 
						
						else if(this.refCode != 'st') {
								     this.$q
					.dialog({
						title: 'Não Permitido',
						message: `Por favor, inclua o ST na referencia. `,
						cancel: false,
						ok: false,
					})
						}
						
						else {
								this.updateProduct({
						id: this.productData.id,
						updates: product
					});
										this.$router.push('/products');

						}


				} else {
					if (
						this.name !== '' &&
						this.category !== '' &&
						this.quantity !== '' &&
						this.provider !== '' &&
						this.price_buy !== '' &&
						this.price_payd !== '' &&
						this.stockBreak !== '' &&
						this.qtdBalcony !== '' &&
						this.description !== '' &&
						this.discount_iva !== '' &&
						this.qtdBalcony !== '' &&
						this.qtdWarehouse !== '' &&
						this.stockBreak !== '' &&
						this.profit !== '' &&
						this.profitMargin !== '' &&
						this.reference !== '' &&
						this.subCategory !== ''
					) {
						product.code = this.code;
					

						if (this.referenceStatus === true) {
							this.$q
								.dialog({
									title: 'Referência Repetida',
									message:
										'Existe um produto com esta refêrencia, por favor mude ',
									ok: 'Está bem',
									cancel: false
								})
								.onOk(() => {
								
								});
						} 
						
						else if(this.refCode != 'st') {
								     this.$q
					.dialog({
						title: 'Não Permitido',
						message: `Por favor, inclua o ST na referencia. `,
						cancel: false,
						ok: false,
					})
						}
						
						
						else {
							this.countCode();
							this.$emit('emitData', product);
							setTimeout(() => {
								this.$router.push('/products');
							}, 1000);
						}
					} else {
						this.$q
							.dialog({
								title: 'Campo não preenchido',
								message:
									'Preencha todos os campos para evitar Inconsistência ',
								ok: 'Está bem',
								cancel: false
							})
							.onOk(() => {
								this.logoutUser();
							});
					}
				}
			},

			countCode() {
				let payload = {
					code: 0
				};
				payload.code = Object.keys(this.products).length + 1;

				if (Object.keys(this.notifications).length > 0) {
					payload.code = Object.keys(this.notifications).length;
					Object.keys(this.notifications).forEach((element, key) => {
						payload.code = this.notifications[element].code + 1;
					});

					Object.keys(this.notifications).forEach((element, key) => {
						this.editNotification({
							id: element,
							updates: payload
						});
					});
				} else {
					this.addNotification(payload);
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
				this.discount_iva = 0;
				this.qtdBalcony = ' ';
				this.qtdWarehouse = '';
				this.stockBreak = '';
				this.code = '';
				this.profit = '';
				this.profitMargin = '';
				this.reference = '';
				this.subCategory = '';
			}
		},

		watch: {
			reference(val) {
				if(val) {

					this.referenceStatus = false;

				}
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
