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
							label="Quantidade do productos"
							v-model="saveObject.quantity"
							lazy-rules
						/>
					</div>
					<div class="col-md-7 col-xs-12 q-pa-sm">
						<q-input
							outlined
							label="Fornecedor do producto"
							v-model="saveObject.provider"
							lazy-rules
						/>
					</div>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui veritatis alias illo iste voluptas dignissimos doloremque soluta cupiditate obcaecati. Odio culpa blanditiis molestias iusto odit sapiente consequatur dolores eligendi totam?
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
					provider: ''
				}
			};
		},
		methods: {
			onSubmit() {
				this.$emit('emitData', this.saveObject);
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
