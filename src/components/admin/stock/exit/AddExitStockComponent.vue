<template>
	<q-dialog
		v-model="toggleDialog"
		@show="onShowDialog"
		persistent
		position="right"
	>
	{{checkExpoProducts}}
		<q-card style="width: 100vw;">
			<q-card-section class="row items-center">
				<div class="text-h6 q-px-sm text-center">
					Exportar  Produtos  
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
				<q-form @submit="onSubmit">
					<div class="q-px-sm">
						<q-select
							filled
							:options="Optionalproducts"
							v-model="saveObject.product"
							label="Produto"
							counter
							maxlength="12"
							:dense="dense"
							:rules="[
								val =>
									(val !== null && val !== '') ||
									'Por favor insira o produto'
							]"
						>
							<template v-slot:append>
								<q-btn
									round
									dense
									flat
									icon="add"
									@click="reloadData"
								/>
							</template>
						</q-select>
					</div>

					<div class="q-pa-sm">
						<q-select v-model="saveObject.destination" :options="destination" label="Finalidade" filled />
					</div>



					<div class="q-py-md q-px-sm"  v-if="saveObject.destination == 'Balcão' ">
				<q-select v-model="saveObject.user" :options="OptionalUsers" label="Funcionário" filled />

			
					</div>


					<div class="text-red-5 q-pa-sm" v-if="saveObject.product">
						Quantidade No Balcao:
						{{
							saveObject.product
								? products[saveObject.product.value].qtdBalcony
								: 0
						}} +  {{saveObject.quantity }}
					</div>

					<div class="text-green q-pa-sm" v-if="saveObject.product">
						Quantidade No Armazém:
						{{
							saveObject.product
								? products[saveObject.product.value]
										.qtdWarehouse
								: 0
						}}
					</div>
					<div class="q-px-sm">
						<q-input
							square
							filled
							type="number"
							label="Quantidade de Retirada"
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
							:label="saveObject.destination != 'Balcão'? 'Descrição da Finalidade' : 'Observação' "
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
					description: 0,
					user: ''

				},
				Optionalproducts: [],
				OptionalUsers: ['Todos'],
				model: [],
				destination: ['Balcão', 'Outra'],
				dense : false
			};
		},
		computed: {
			...mapState('product', ['products', 'loading']),
			...mapState('provider', ['providers']),
			...mapState('product', ['products']),
			...mapState('auth', ['users',]),
			...mapState('expo', ['expoProducts', 'idExpo']),


			checkExpoProducts() {
					
					if(this.saveObject.product !== '' &&  this.saveObject.user !== '') {
					  this.filterExpoProduct( { product : this.saveObject.product, user : this.saveObject.user  })
					}
					

			},

			fetchProducts() {
				Object.keys(this.products).forEach((element, key) => {
					this.Optionalproducts.push({
						value: element,
						label: this.products[element].name,
						code : this.products[element].code,
						price : this.products[element].price_buy
					});
					
					this.saveObject.productCode = element;
					this.saveObject.oldQuantity = this.saveObject.product
						? this.products[this.saveObject.product.value]
								.qtdWarehouse
						: 20;
				});
			},

			fetchUsers() {
				Object.keys(this.users).forEach((element, key) => {
					this.OptionalUsers.push({
						value: element,
						label: this.users[element].name
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
			}
		},
		mounted() {
			this.fetchUsers;
			this.fetchProducts;
			
		},
		methods: {



			...mapActions('stockExit', ['editStockExit']),
			...mapActions('product', ['updateProduct', 'getData']),
			...mapActions('expo', [
				
				'filterExpoProduct'
			]),


			clearData() {
				this.saveObject.product = '',
				this.saveObject.quantity = '',
				this.saveObject.destination = '',
				this.saveObject.description = ''
			

			},

			reloadData() {
				this.Optionalproducts = [];
				this.fetchProducts;
				this.getData();
				this.fetchUsers();
			},

			onSubmit() {

				
				

				if (this.updateObject.id) {
					this.editStockExit({
						id: this.updateObject.id,
						updates: this.saveObject
					});
					let lastQtd = ~~this.products[this.saveObject.product.value]
						.qtdBalcony;
					let newQtd = ~~this.saveObject.quantity;


				
					




				} else {
					if (
						this.saveObject.quantity >
						this.products[this.saveObject.product.value]
							.qtdWarehouse
					) {
						this.$q.dialog({
							title: 'Quantidade Inválida',
							message: `Não existe quantidade de ${
								this.products[this.saveObject.product.value]
									.name
							} suficiente
							somente tem ${
								this.products[this.saveObject.product.value]
									.qtdWarehouse
							} unidades no armazém
							`
						});
					} else {

						if(Object.keys(this.idExpo).length > 0 ) {
							this.saveObject.IdExpo = this.idExpo.keys
							console.log('submut' , this.idExpo.keys)

						}
						



						  this.$emit('emitData', this.saveObject);
						//  this.clearData()
					
					
					if( this.saveObject.user == 'Todos' ) {
						
					// this.updateProduct({
					// 	id: this.saveObject.product.value,
					// 	updates: { qtdWarehouse: +lastQtd + newQtd }
					// });

					}
						
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
