<template>
	<div >
		<q-card class="my-card q-pa-md q-ma-sm " style="min-width: 450px;">
			<q-card-section class="">
				<div class="text-subtitle2">
					Enviado por {{ exported.createdBy }}
				</div>
			</q-card-section>

			<q-separator />

			<div
			 
			>
				<q-list dense bordered padding class="borders">
					<q-item clickable v-ripple>
						<div>
							{{
								exported.newQtd > 1
									? `${exported.quantity} unidades de  ${exported.name}`
									: `${exported.quantity} unidade de  ${exported.name}`
							}}
						</div>
					</q-item>
				</q-list>
			</div>

			<q-card-actions>
				<q-btn unelevated color="primary" class="q-px-md" @click="accept(id)">
					Aceitar
				</q-btn>

				<q-btn unelevated color="deep-orange"  class="q-px-md "  @click="deny(id)">
					Recusar
				</q-btn>
			</q-card-actions>
		</q-card>
	</div>
</template>

<script>
	export default {
        props: ['exported','id'],
        
        methods: {
                accept(id) {
							this.$q
					.dialog({
						title: 'Aceitar Produto ',
						message: `Tem certeza que deseja aceitar este produto?`,

						ok: 'Sim',
						cancel : 'Não'
					})
					.onOk(() => {
                        this.$emit('accept', id)
				});

						
                },
				 deny(id) {
					 		this.$q
					.dialog({
						title: 'Recusar Produto ',
						message: `Tem certeza que deseja recusar este produto?`,

						ok: 'Sim',
						cancel : 'Não'
					})
					.onOk(() => {

                        this.$emit('deny', id)					});

                }

        }
	};
</script>

<style></style>
