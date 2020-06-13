<template>
	<q-dialog
		v-model="toggleDialog"
		@show="onShowDialog"
		persistent
		position="right"
	>
		<q-card style="width: 100vw;">
			<q-card-section class="row items-center">
				<div class="text-h6 text-center">Registo de Fornecedores</div>
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
				<q-form @submit="onSubmit" @reset="onReset">

						<q-select
						filled
						dense
						outlined
						square
						:options="type"
						v-model="saveObject.type"
						label="Tipo de fornecdor *"
						lazy-rules
						:rules="[
							val =>
								(val !== null && val !== '') ||
								'Por favor insira o tipo de fornecedor'
						]"
					/>

					<q-input
						filled
						square
						v-model="saveObject.name"
						label="Nome *"
						lazy-rules
						dense
						:rules="[
							val =>
								(val && val.length > 0) ||
								'Por favor introduz o nome'
						]"
					/>


					<q-input
					filled
						square
						v-model="saveObject.email"
						label="Email *"
						type="email"
						lazy-rules
						dense
						:rules="[
							val =>
								(val && val.length > 0) ||
								'Por favor introduz o email'
						]"
					/>

					<q-input
						filled
						square
						v-model="saveObject.name"
						label="Contacto *"
						type="number"
						lazy-rules
						dense
						:rules="[
							val =>
								(val && val.length > 0) ||
								'Por favor introduz o contacto'
						]"
					/>

				
					<q-input
						filled
						square
						v-model="saveObject.address"
						label="Endereço  *"
						type="text"

						dense
						lazy-rules
						:rules="[
							val =>
								(val !== null && val !== '') ||
								'Por favor, insira endereco do fornecedor'
						]"
					/>

					<q-input
						outlined
						filled
						square
						v-model="saveObject.website"
						label="Website  *"
						type="text"
						lazy-rules
						dense
						
					/>

					<div class="text-center">
						<!--<router-link to="/">LOgin</router-link>-->

						<div class="q-my-md">
							<q-btn
								label="Registar"
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
		name: 'DialogAddEditBlog',
		props: ['dialog', 'editObject'],
		data() {
			return {
				saveObject: {},
				model: [],
				options: [
					'Administrador',
					'Acesso somente aos Produtos e Categorias',
					'Acesso aos Clientes e Fornecedores',
					'Acesso a gestão de Stock',
					'Nenhum Acesso'
				],
				type: [
					'Singular Externo',
					'Singular Interno',
					'Empresa',
					'Externo'
				]
			};
		},
		computed: {
			toggleDialog: {
				get() {
					return this.dialog;
				},
				set(val) {
					this.$emit('closeDialog');
				}
			},
			selectedId() {
				return this.editObjectPost ? this.editObjectPost.id : null;
			}
		},
		mounted() {
		},
		methods: {

			
			onSubmit() {
			
				this.$emit('emitData', this.saveObject);
				

				this.$emit('closeDialog');
			},

			onShowDialog() {
				if (this.editObjectPost) {
					this.saveObject = this.editObjectPost;
				} else {
				}
			},

			onReset() {
			}
		}
	};
</script>

<style scoped></style>
