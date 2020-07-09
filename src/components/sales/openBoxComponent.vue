<template>
	<q-dialog v-model="toggleDialog"  persistent>
		<q-card style="width: 300px;">
			<q-card-section class="row items-center">
				<div class="text-h6 text-center">Abertura de Caixa</div>
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
					<q-select
						v-model="saveObject.typeValue"
						:options="options"
						label="Montante em "
						filled
						dense
						lazy-rules
						:rules="[
							val =>
								(val && val.length > 0) ||
								'Por favor introduz o montante'
						]"
					/>
					<q-input
						outlined
						v-model="saveObject.value"
						label="Montante *"
						lazy-rules
						dense
						
						v-if="saveObject.typeValue == 'Cartão' || saveObject.typeValue == 'Cash' || saveObject.typeValue == 'Cheque'"
						type="number"
						filled
						:rules="[
							val =>
								(val && val.length > 0) ||
								'Por favor introduz o montante'
						]"
					/>

					<q-input
						outlined
						v-model="saveObject.check"
						label="Numero de Cheque *"
						lazy-rules
						dense
						v-if="saveObject.typeValue == 'Cheque'"
						type="number"
						filled
						:rules="[
							val =>
								(val && val.length > 0) ||
								'Por favor introduz o numero de cheque'
						]"
					/>

					<q-input
						outlined
						v-model="saveObject.card"
						label="Numero de Cartão *"
						lazy-rules
						dense
						v-if="saveObject.typeValue == 'Cartão'"
						type="number"
						filled
						:rules="[
							val =>
								(val && val.length > 0) ||
								'Por favor introduz o numero de cartão'
						]"
					/>

					<q-input
						v-model="saveObject.description"
						filled
						dense
						label="Observaçoes"
						type="textarea"
					/>

					<div class="text-center">
						<!--<router-link to="/">LOgin</router-link>-->

						<div class="q-my-md">
							<q-btn
								:label="
									updateCategory ? 'Actualizar' : 'Registar'
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
	import { mapActions, mapState , mapGetters} from 'vuex';

	export default {
		name: 'DialogAddEditBlog',
		props: ['open', 'updateCategory'],
		data() {
			return {
				saveObject: {},
				model: [],
				options: [
					'Cash',
					'Cheque',
					'Cartão',
					
				]
			};
		},
		computed: {
			...mapGetters('auth', ['getUserName', 'getUserAuth']),

			toggleDialog: {
				get() {
					return this.open;
				},
				set(val) {
					this.$emit('closeDialog');
				}
			},
		
		},
		mounted() {},
		methods: {
			onSubmit() {
			
					this.saveObject.createdBy = this.getUserAuth;
					this.saveObject.status = true;
					this.saveObject.dayEnd = false;
					this.saveObject.beginValue = 	this.saveObject.value;
					
					this.$emit('emitData', this.saveObject);
					this.$emit('closeDialog');
				}
			},


			
	};
</script>

<style scoped></style>
