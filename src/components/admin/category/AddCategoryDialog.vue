<template>

	<q-dialog
		v-model="toggleDialog"
		@show="onShowDialog"
		persistent
		position="right"
	>
		<q-card style="width: 300px;">
			<q-card-section class="row items-center">
				<div class="text-h6 text-center"> Categoria</div>
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
						v-model="saveObject.name"
						label="Nome *"
						lazy-rules
						:rules="[
							val =>
								(val && val.length > 0) ||
								'Por favor introduz o nome'
						]"
					/>

				
					<q-input
      v-model="saveObject.description"
      filled
      type="textarea"
    />

					<div class="text-center">
						<!--<router-link to="/">LOgin</router-link>-->

						<div class="q-my-md">
							<q-btn
								:label="updateCategory ? 'Actualizar' : 'Registar'"
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
		props: ['dialog', 'updateCategory'],
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
				},

				
			},
			selectedId () {
                return this.updateCategory ? this.updateCategory.id : null
            },
            
			
            
		},
		mounted() {
		},
		methods: {

			          ...mapActions('category', ['editCategory']),

			onSubmit() {
				
                if (this.selectedId) {

					delete this.saveObject.id //deletando Id
					console.log(this.selectedId);
					

                    this.editCategory ({
                        id: this.selectedId,
                        updates: this.saveObject
					})
										this.$emit('closeDialog');


                } else {
			
				this.$emit('emitData', this.saveObject);
				

				this.$emit('closeDialog');
			}},

			onShowDialog() {
				if (this.updateCategory) {
					this.saveObject = this.updateCategory;
				} else {
				}
			},

			onReset() {
			}
		}
	};
</script>

<style scoped></style>
