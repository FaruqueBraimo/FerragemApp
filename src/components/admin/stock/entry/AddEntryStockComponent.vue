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
						v-model="saveObject.name"
						label="Seu nome *"
						lazy-rules
						:rules="[
							val =>
								(val && val.length > 0) ||
								'Por favor introduz o nome'
						]"
					/>

					<q-select
						outlined
						type="email"
						:options="type"
						v-model="saveObject.type"
						label="Tipo de Cliente *"
						lazy-rules
						:rules="[
							val =>
								(val !== null && val !== '') ||
								'Por favor insira o tipo de cliente'
						]"
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
