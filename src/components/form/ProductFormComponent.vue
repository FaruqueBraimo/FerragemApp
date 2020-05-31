<template>
	<div  class="row items-center justify-center">
		<q-card class="q-pa-sm" square bordered style="width: 60%">
			<div class="form-header">
				<p class="text-h6 text-center ">
					Preencha os campos abaixo para registar um produto
				</p>
			</div>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-py-md">
				<div class="row">
					<div class="col-6 q-px-sm">
						<q-input
							outlined
							label="Nome do producto"
							v-model="saveObject.name"
							lazy-rules
						/>
					</div>
					<div class="col-6 q-px-sm">
						<q-select
							label="Categoria do Produto"
							outlined
							:options="category"
							v-model="saveObject.category"
						/>
					</div>
					<div class="col-md-6 col-xs-12 q-pa-sm">
						<q-input
							outlined
							label="Preco do producto"
							v-model="saveObject.price_sale"
							lazy-rules
						/>
					</div>
					<div class="col-md-6  q-pa-sm">
						<q-select
							label="Fornecedor do Produto"
							outlined
							:options="utility"
							v-model="saveObject.utility"
						/>
					</div>
					<div class="col-6  q-pa-sm">
						<q-input
							outlined
							label="Quantidade do producto"
							v-model="saveObject.quantity"
							lazy-rules
						/>
					</div>


					<div class="col-6  q-pa-sm">
						<q-input
							outlined
							label="Preço de compra "
							v-model="saveObject.price_buy"
							lazy-rules
						/>
					</div>
						<div class="col-6  q-pa-sm">
						<q-input
							outlined
							label="Outro "
							v-model="saveObject.other"
							lazy-rules
						/>
					</div>
					<div class="col-6  q-pa-sm">
						<q-input
							outlined
							v-model="saveObject.expires"
							label="Data de validade( *So se o produto tiver)"
						>
							<template v-slot:append>
								<q-icon name="event" class="cursor-pointer">
									<q-popup-proxy
										ref="qDateProxy"
										transition-show="scale"
										transition-hide="scale"
									>
										<q-date
											v-model="date"
											@input="
												() => $refs.qDateProxy.hide()
											"
										/>
									</q-popup-proxy>
								</q-icon>
							</template>
						</q-input>
					
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
	export default {
		name: 'ProductFormComponent',
		data() {
			return {
				date: 'AAAA/MM/DD',
				category: [
					'Categoria 1',
					'Categoria 2',
					'Categoria 3',
					'Categoria 4',
					'Categoria 5'
				],
				utility: ['Venda', 'Uso Interno'],
				saveObject: {
					name: 'ss',
					category: '',
					price: '',
					utility: '',
					quantity: '',
					expires: ''
				}
			};
		},
			computed: {
			...mapState('product', ['products', 'loading'])
		},
			
		methods: {
			onSubmit() {
				this.$emit('emitData', this.saveObject);
			},
			onReset() {
				this.saveObject = {};
				
			},
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
