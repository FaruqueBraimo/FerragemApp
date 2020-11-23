<template>
	<q-dialog
		v-model="toggleDialog"
		@show="onShowDialog"
		persistent
		position="right"
	>
		<q-card style="width: 100vw;">
			<q-card-section class="row items-center">
				<div class="text-h6 text-center">Registo de Clientes</div>
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
					<q-input
						outlined
						filled
						square
						v-model="saveObject.name"
						label=" Nome *"
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
								'Por favor, insira endereco do cliente'
						]"
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
				type: [
					'Singular',
					'Empresa',
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
		...mapActions('customer', ['updateCustomer']),

			
			onSubmit() {
			
			if(this.updateObject.id) {

					this.updateCustomer({
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
		}
	};
</script>

<style scoped></style>
