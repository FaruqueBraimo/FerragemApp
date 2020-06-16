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
							>Detalhes do Fornecedor</q-item-label
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
									>Nome do Fornecedor</q-item-label
								>
								<q-item-label lines="1" class="text-weight-bold">{{
									provider.name
								}}</q-item-label>
							</q-item-section>
						</q-item>

						<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="emoji_flags"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Tipo de Fornecedor</q-item-label
								>
								<q-item-label lines="1" class="text-weight-bold">{{
									provider.type
								}}</q-item-label>
							</q-item-section>
						</q-item>

						<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="location_on"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Endereco do Fornecedor</q-item-label
								>
								<q-item-label lines="1" class="text-weight-bold">{{
									provider.address
								}}</q-item-label>
							</q-item-section>
						</q-item>
						
							<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="phone"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Telefone</q-item-label
								>
								<q-item-label lines="1">{{
									provider.phone || 'Não Informado'
								}}</q-item-label>
							</q-item-section>
						</q-item>

						<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="mail"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Email</q-item-label
								>
								<q-item-label lines="1">{{
									provider.email || 'Não Informado'
								}}</q-item-label>
							</q-item-section>
						</q-item>




						<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="location_on"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Endereço</q-item-label
								>
								<q-item-label lines="1">{{
									provider.address || 'Não Informado'
								}}</q-item-label>
							</q-item-section>
						</q-item>






						<q-item clickable v-ripple>
							<q-item-section avatar top>
								<q-avatar
									icon="info"
									text-color="primary"
								/>
							</q-item-section>

							<q-item-section>
								<q-item-label class="text-subtitle1"
									>Observação</q-item-label
								>
								<q-item-label lines="1">{{
									provider.website || 'Não Informado'
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
		name: 'providerDetailsDialog',
		props: ['provider'],
		data() {
			return {
				dialog: false
			};
		},
	};
</script>

<style scoped>
	* {
		color: #585858;
	}
</style>
