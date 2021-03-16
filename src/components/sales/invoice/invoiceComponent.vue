<template>
	<div class="q-pb-md ">
          
 <div class="q-py-md" >
   <q-input filled v-model="date" placeholder='Prazo de Validade' dense>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="DD-MM-YYYY "  />
          </q-popup-proxy>
        </q-icon>
      </template>
	  
	  </q-input>
  </div> 

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
					<q-tab name="mails" label="Detalhes da Factura" />
					<q-tab name="alarms" label="Cliente" />
				</q-tabs>

				<q-separator />

				<q-tab-panels v-model="tab" animated>
					<q-tab-panel name="mails">
						<q-card
							class="my-card bg-deep-orange-1
"
							flat
							bordered
							square
						>
                        	
							<div class="row q-pa-sm text-deep-orange-5 ">
								<div class="col">Subtotal :</div>
								<div class="col text-right q-pr-md">
									{{ getSubTotal }} ,00 MT
								</div>
							</div>
							<div class="row q-pa-sm text-deep-orange-5 ">
								<div class="col-6 text-left">
									Desconto de Iva :
								</div>
								<div class="col text-right q-pr-md">
									0,00 MT
								</div>
							</div>

							<div class="row q-pa-sm text-deep-orange-5">
								<div class="col">Total :</div>
								<div class="col text-right q-pr-md">
									{{ getSubTotal }} ,00 MT
								</div>
							</div>

							<div class="row q-pa-sm text-deep-orange-5">
								<div class="col">Prazo :</div>
								<div class="col text-right q-pr-md">
									{{ date || 'Por Preencher'}} 
								</div>
							</div>


							<div class="row q-pa-sm text-deep-orange-5">
								<div class="col">Cliente :</div>
								<div class="col text-right q-pr-md">
									{{ client.label || 'Não Informado' }} 
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
		<div class="row q-pa-lg">
		<div class="q-pt-xl col-12">
				<q-btn
					color="indigo"
					no-caps
					class=" full-width"
					unelevated
					icon="done"
					label="Finalizar"
					:disable="disable"
					@click="$emit('invoice',{  subtotal : getSubTotal, iva:0, client :client , deadline : date})"

				/>

			</div>

		
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import { date } from 'quasar';

	export default {
		data() {
			return {
				tab: 'mails',
				client: '',
                optionalClient: [],
                value : 0,
				change : 0,
				disable:true,
			    date: ''



			};
		},
		computed: {
			...mapGetters('checkedProduct', ['getSubTotal']),
			...mapState('customer', ['customers']),

			fetchClients() {
			
			const dateReturn = date.extractDate(this.date, 'DD-MM-YYYY ')
            const dateNow = new Date
			  if(this.date !='' && dateReturn < dateNow) {
					   this.disable = true 
					   
					this.$q
					.dialog({
						title: 'Data Inválida',
						message: `A data Introduzida é inferior a data actual. 
						`,
						ok: 'Sim',
					})
			  }
			  else {
				 this.disable = false 	
			  }

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
		},

		mounted() {
		
		}
	};
</script>

