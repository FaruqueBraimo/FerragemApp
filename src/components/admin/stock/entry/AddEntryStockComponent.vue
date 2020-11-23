<template>
	<q-dialog
		v-model="toggleDialog"
		@show="onShowDialog"
		persistent
		position="right"
	>
	
		<q-card style="width: 100vw;">
			<q-card-section class="row items-center">
				<div class="text-h6 q-px-sm text-center">
					Entrada de Produtos   
				</div>
				<q-space />
				<q-btn
					icon="close"
					flat
					round
					dense
					@click="$emit('closeDialog')"
				/>
			</q-card-section>
			<q-card-section>
				<q-form @submit="onSubmit" >
					<div class="q-px-sm">
					
	     <q-select filled  :options="Optionalproducts" v-model="saveObject.product" label="Produto" counter maxlength="12" :dense="dense" :options-dense="denseOpts"
		 
		 	:rules="[
								val =>
									(val !== null && val !== '') ||
									'Por favor insira o produto'
							]"
		 >
     

        <template v-slot:append>
          <q-btn round dense flat icon="add" @click='reloadData' />
        </template>
		
      </q-select>

					</div>


					<div class=" q-px-sm">
						<q-select
							label="Fornecedor do Produto"
							square
							filled
							:options="Optionalprovider"
							v-model="saveObject.provider"
							:rules="[
								val =>
									(val !== null && val !== '') ||
									'Por favor insira o fornecedkor'
							]"
							>
		<template v-slot:append>
          <q-btn round dense flat icon="add" @click='reloadProviders' />
        </template>
      </q-select>
					</div>
				 <div class="text-green q-pa-sm" v-if="saveObject.product "> Quantidade Actual:	{{ saveObject.product ? products[saveObject.product.value].qtdWarehouse : 0}} </div>
					<div class="q-px-sm">
						<q-input
							square
							filled
							type="number"
							label="Nova Quantidade "
							v-model="saveObject.quantity"
							lazy-rules
							:rules="[
								val =>
									(val !== null && val !== '') ||
									'Por favor insira o codigo'
							]"
						/>
					</div>

					





					<div class="q-px-sm">
						<q-input
							v-model="saveObject.description"
							filled
							type="textarea"
							label="Observação"
						/>
					</div>

					<div class="text-center">
						<!--<router-link to="/">LOgin</router-link>-->

						<div class="q-my-md">
							<q-btn
								:label="
									updateObject.id ? ' Actualizar' : 'Registar'
								"
								size="md"
								type="submit"
								color="primary"
								unelevated
								class="full-width "
							/>
						</div>
					</div>
				</q-form>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'DialogAddEditStock',
		props: ['dialog', 'updateObject'],
		data() {
			return {
				saveObject: {
					productCode: '',
					quantity: 0,
					product: '',
					oldQuantity : 0,
				},
				Optionalproducts: [],
				Optionalprovider: [],
				model: [],
				type: ['Singular', 'Empresa']
			};
		},
		computed: {
			...mapState('product', ['products', 'loading']),
			...mapState('provider', ['providers']),
							...mapState('product', ['products']),


			fetchProducts() {
				Object.keys(this.products).forEach((element, key) => {
					this.Optionalproducts.push({
						value: element,
						label: this.products[element].name
					});
					this.saveObject.productCode = element;
					this.saveObject.oldQuantity = this.saveObject.product ? this.products[this.saveObject.product.value].qtdWarehouse : 20;

				});

			},

			fetchProviders() {
				Object.keys(this.providers).forEach((element, key) => {
					this.Optionalprovider.push({
						value: element,
						label: this.providers[element].name
					});
				});
			},

			toggleDialog: {
				get() {
					return this.dialog;
				},
				set(val) {
					this.$emit('closeDialog');
				}
			},
			
		},
		mounted() {
			this.fetchProducts()
			this.fetchProviders
		},
		methods: {


			...mapActions('stockEntry' , ['editStockEntry']),
			...mapActions('product', ['updateProduct', 'getData']),
						...mapActions('provider', ['getProviderData']),



			reloadData(){
				this.Optionalproducts = [];
				this.fetchProducts;
				this.getData();

			},

			reloadProviders() {
				this.Optionalproviders = [];
				this.fetchProviders;
				this.getProviderData();

			},

			onSubmit() {
				if (this.updateObject.id) {
					this.editStockEntry({
						id: this.updateObject.id,
						updates: this.saveObject
					});
					let lastQtd = ~~ this.products[this.saveObject.productCode].qtdWarehouse
					let newQtd =  ~~ this.saveObject.quantity
					this.updateProduct( {
						id : this.saveObject.product.value,
						updates : { qtdWarehouse : +lastQtd+newQtd  } })
					
				} else {

					if (this.saveObject.quantity <= 0) {
						this.$q.dialog({
							title: 'Quantidade Inválida',
							message: 'Coloque uma quantidade real por favor'
						});
					} else {
						this.$emit('emitData', this.saveObject);
					}
				}

				this.$emit('closeDialog');
			},

			onShowDialog() {}
		},

		watch: {
			updateObject(val) {
				if (val) {
					this.saveObject = this.updateObject;
				}
			}
		}
	};
</script>

<style scoped></style>
