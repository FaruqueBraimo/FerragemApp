<template>
	<div>
		<q-btn
			flat
			size="sm"
			rounded
			text-color="secondary"
			icon="visibility"
			@click="dialog = true"
		/>
		<q-dialog v-model="dialog">
			<q-card style="width: 700px; max-width: 80vw;">
				<q-card-section class="q-pt-none">
					<q-list padding class="rounded-borders">
						<q-item-label header class="text-h6"
							>Detalhes do Producto</q-item-label
						>
						<q-separator class="q-mb-md"/>

						<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="perm_identity"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Nome do Producto</q-item-label
								>
								<q-item-label lines="1" class="text-weight-bold">{{
									product.name
								}}</q-item-label>
							</q-item-section>
						</q-item>

						<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="group"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Categoria do Producto</q-item-label
								>
								<q-item-label lines="1" class="text-weight-bold">{{
									product.category.label
								}}</q-item-label>
							</q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="looks_4"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Quantidade do Producto</q-item-label
								>
								<q-item-label lines="1" class="text-weight-bold">{{
									product.quantity
								}}</q-item-label>
							</q-item-section>
						</q-item>
						<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="group"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Fornecedor do Producto</q-item-label
								>
								<q-item-label lines="1" class="text-weight-bold">{{
									product.provider.label
								}}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="OK" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
	export default {
		name: 'CustomerDetailsDialog',
		props: ['product'],
		data() {
			return {
				dialog: false
			};
		},
		filters: {
			dateFormat(val) {
				var months = [
					'Janeiro',
					'Fevereiro',
					'Março',
					'Abril',
					'Maio',
					'Junho',
					'Julho',
					'Agosto',
					'Setembro',
					'Outubro',
					'Novembro',
					'Dezembro'
				];
				let dateCreated = new Date(val.seconds * 1000);
				return (
					dateCreated.getDate() +
					' de ' +
					months[dateCreated.getMonth()] +
					' de ' +
					dateCreated.getFullYear()
				);
			}
		}
	};
</script>

<style scoped>
	* {
		color: #585858;
	}
</style>
