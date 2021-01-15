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
				v-for="(prod, index) in exported.product"
				:key="index"
				class="q-pa-xs"
			>
				<q-list dense bordered padding class="borders">
					<q-item clickable v-ripple>
						<div>
							{{
								prod.newQtd > 1
									? `${prod.newQtd} unidades de  ${prod.name}`
									: `${prod.newQtd} unidade de  ${prod.name}`
							}}
						</div>
					</q-item>
				</q-list>
			</div>

			<q-card-actions>
				<q-btn unelevated color="primary" class="q-px-md" @click="accept(id)">
					Aceitar
				</q-btn>

				<q-btn unelevated color="deep-orange" disable class="q-px-md">
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
                        this.$emit('accept', id)
                }

        }
	};
</script>

<style></style>
