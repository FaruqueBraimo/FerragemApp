<template>
	<q-dialog
		v-model="toggleDialog"
		@show="onShowDialog"
		persistent
		position="right"
	>
		<q-card style="width: 100vw;">
			<q-card-section class="row items-center">
				<div class="text-h6 q-px-md text-center">Entrada de Produtos</div>
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
					<div class="q-pa-md">
						<q-select
							label="Produto"
							square
							filled
							:options="Optionalproducts"
							v-model="saveObject.product"
						/>
					</div>
					<div class="q-pa-md">
						<q-input
							square
							filled
							type="number"
							label="Quantidade"
							v-model="saveObject.quantity"
							lazy-rules
						/>
					</div>
					<div class="q-pa-md">
						<q-input
							v-model="saveObject.description"
							filled
							type="textarea"
							label="Observação"
						/>
					</div>

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
				Optionalproducts: [],
				model: [],
				type: ['Singular', 'Empresa']
			};
		},
		computed: {
				...mapState('product', ['products', 'loading']),

				fetchProducts() {
				Object.keys(this.products).forEach((element, key) => {
					this.Optionalproducts.push({
						value: element,
						label: this.products[element].name
					});
				});
				},

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
			this.fetchProducts()
		},
		methods: {
			onSubmit() { 
				if(this.saveObject.quantity <= 0 ) {
					 
      this.$q.dialog({
        title: 'Quantidade Inválida',
        message: 'Coloque uma quantidade real por favor'
      })

				}
				else{
							this.$emit('emitData', this.saveObject);

				}

				this.$emit('closeDialog');
			},

			onShowDialog() {
				if (this.editObjectPost) {
					this.saveObject = this.editObjectPost;
				} else {
				}
			},

			onReset() {}
		}
	};
</script>

<style scoped></style>
