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
						label="Tipo de Fornecdor *"
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
						v-model="saveObject.phone"
						label="Telefone *"
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

					<div class="q-pb-md">
					<q-input
						outlined
						filled
						square
						type="number"
						v-model="saveObject.nuit"
						label="Nuit "
						lazy-rules
						dense
						
					/>
						</div>


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

					<div class=" row text-center">
						<!--<router-link to="/">LOgin</router-link>-->

						<div class=" col q-ma-md">
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

						<div class=" col q-ma-md">
							<q-btn
								label="Limpar Campos"
								size="md"
								color="deep-orange"
								unelevated
								@click="onReset()"
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
		props: ['dialog', 'updateObject'],
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
			
		},
		mounted() {
		},
		methods: {
		...mapActions('provider', ['updateProvider', 'deleteProvider']),

			
			onSubmit() {

					if(this.updateObject.id) {

					this.updateProvider({
						id: this.updateObject.id,
						updates: this.saveObject
					});
					this.onReset()
					}
					else {
				this.$emit('emitData', this.saveObject);
					this.onReset()

					}
				

				this.$emit('closeDialog');
			},

			onShowDialog() {
				if (this.editObjectPost) {
					this.saveObject = this.editObjectPost;
				} else {
				}
			},

			onReset() {
				this.saveObject = {}
			}
		},
		watch: {
			updateObject(val) {
				if (val) {
					this.saveObject = this.updateObject;
				}
			}
		},

		destroyed(){
				this.onReset()
		}
	};
</script>

<style scoped></style>
