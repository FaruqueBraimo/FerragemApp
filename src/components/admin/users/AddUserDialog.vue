<template>
	<q-dialog
		v-model="toggleDialog"
		@show="onShowDialog"
		persistent
		position="right"
	>
		<q-card style="width: 100vw;">
			<q-card-section class="row items-center">
				<div class="text-h6 text-center">Registo de Utilizador</div>
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

					<q-input
						outlined
						type="email"
						v-model="saveObject.email"
						label="Email *"
						lazy-rules
						:rules="[
							val =>
								(val !== null && val !== '') ||
								'Por favor insira o seu email'
						]"
					/>
					<q-select
						label="Privilêgios"
						transition-show="jump-up"
						transition-hide="jump-up"
						filled
						v-model="saveObject.role"
						:options="options"
						class="q-pb-md"
					/>

					<q-input
						outlined
						v-model="saveObject.password"
						label="Senha *"
						type="password"
						lazy-rules
						:rules="[
							val =>
								(val !== null && val !== '') ||
								'Por favor, insira uma senha válida.'
						]"
					/>

					<q-input
						outlined
						v-model="saveObject.confirmPassword"
						label="Confirme senha *"
						type="password"
						lazy-rules
						:rules="[
							val =>
								(val !== null && val !== '') ||
								'Insira a seha de confirmação',
							val =>
								val === saveObject.password ||
								'A senha de confirmação inválida.'
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
				options: [
					'Administrador',
					'Nivel 1 ',
					'Nivel 2',
					'Nivel 3',
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
