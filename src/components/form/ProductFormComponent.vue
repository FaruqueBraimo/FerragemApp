<template>
	<div>
		<q-card class="q-pa-sm">
			<div class="form-header">
				<p class="text-h6">
					Preencha os campos abaixo para registar um produto
				</p>
			</div>
			<q-form @submit="onSubmit" class="q-gutter-md q-py-md">
				<div class="row">
					<div class="col-md-8 col-xs-12 q-pa-sm">
						<q-input
							outlined
							label="Nome do producto"
							v-model="saveObject.name"
							lazy-rules
						/>
					</div>
					<div class="col-md-4 col-xs-12 q-pa-sm">
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
							v-model="saveObject.price"
							lazy-rules
						/>
					</div>
					<div class="col-md-6 col-xs-12 q-pa-sm">
						<q-select
							label="Finalidade do Produto"
							outlined
							:options="utility"
							v-model="saveObject.utility"
						/>
					</div>
					<div class="col-md-5 col-xs-12 q-pa-sm">
						<q-input
							outlined
							label="Quantidade do producto"
							v-model="saveObject.quantity"
							lazy-rules
						/>
					</div>
					<div class="col-md-7 col-xs-12 q-pa-sm">
						<q-input
							outlined
							v-model="saveObject.expires"
							label="Data de validade"
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
					<div class="submit col-xs-12 col-md-12">
						<q-btn label="Registar" type="submit" color="primary" />
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
					name: '',
					category: '',
					price: '',
					utility: '',
					quantity: '',
					expires: ''
				}
			};
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
