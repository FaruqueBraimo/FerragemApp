<template>
	<div class="q-pb-md">
		<div class="" style="">
			{{ fetchClients }}
			<q-card square class="">
				<q-tabs
					v-model="tab"
					dense
					class="text-grey"
					active-color="primary"
					indicator-color="primary"
					align="justify"
					narrow-indicator
				>
					<q-tab name="mails" label="Detalhes da Venda" />
					<q-tab name="alarms" label="Cliente" />
				</q-tabs>

				<q-separator />

				<q-tab-panels v-model="tab" animated>
					<q-tab-panel name="mails">
						<q-card
							class="my-card bg-green-11"
							flat
							bordered
							square
						>
							<div class="row q-pa-sm text-green-8 ">
								<div class="col">Subtotal :</div>
								<div class="col text-right q-pr-md">
									{{ getSubTotal }} ,00 MT
								</div>
							</div>
							<div class="row q-pa-sm text-green-8 ">
								<div class="col-6 text-left">
									Desconto de Iva :
								</div>
								<div class="col text-right q-pr-md">
									0,00 MT
								</div>
							</div>

							<div class="row q-pa-sm text-green-8">
								<div class="col">Total :</div>
								<div class="col text-right q-pr-md">
									{{ getSubTotal }} ,00 MT
								</div>
							</div>
						</q-card>
					</q-tab-panel>

					<q-tab-panel name="alarms">
						<q-form
							@submit="onSubmit"
							@reset="onReset"
							class="q-gutter-md"
						>
							<div class="row q-px-sm">
								<!-- <p class="text-h6 text-primary text-bold"> Detalhes do producto </p> -->

								<div class="col-12 q-px-sm">
									<q-select
										dense
										label=" Selecione o Cliente"
										square
										filled
										:options="optionalClient"
										v-model="client"
									/>
								</div>

							
							</div>

							<div class="row  items-center">
									<div class=" col-12 text-primary q-pl-sm  ">
									
									<q-btn
                                    no-caps
										label="Ou registe um novo cliente"
										type="reset"
										color="primary"
										flat
										class="q-ml-sm text-center full-width"
									/>
									
								</div>
								
							</div>
						</q-form>
					</q-tab-panel>
				</q-tab-panels>
			</q-card>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';

	export default {
		data() {
			return {
				tab: 'mails',
				client: '',
				optionalClient: []
			};
		},
		computed: {
			...mapGetters('checkedProduct', ['getSubTotal']),
			...mapState('customer', ['customers']),

			fetchClients() {
				Object.keys(this.customers).forEach((element, key) => {
					this.optionalClient.push({
						value: element,
						label: this.customers[element].name
					});
				});
				return '';
			}
		},

		methods: {
			onSubmit() {},
            onReset() {},
            finalCheck() {

                
            }
		}
	};
</script>
