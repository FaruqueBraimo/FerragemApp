<template>
<q-card class="my-card">
	<q-card-section>
		<div id="printMe" >
			

			<div class="row q-pa-sm" >
				<div class="col text-bold text-grey-7">Produto</div>

				<div class="col  text-bold text-grey-7 text-right q-pr-md">
					Quantidade
				</div>

				<div class="col  text-bold text-grey-7 text-right q-pr-md">
					Preço
				</div>
			</div>

				<div class="row q-pa-sm" v-for="i in invoice.products" :key="i" >
						<div class="col">{{ i.name }}</div>

					<div class="col text-right q-pr-md">
						{{ i.newQtd }}
					</div>

					<div class="col text-right q-pr-md">
						{{ i.price_buy }},00 MT
					</div>
			
			
			</div>
			<hr class="text-center q-ma-sm" />

		
			<div class="row q-pa-sm ">
				<div class="col">Cliente :</div>
				<div class="col text-right q-pr-md">
					{{
						invoice.details.client
							
					}}
				</div>
			</div>

		

			<div class="row q-pa-sm ">
				<div class="col text-teal" v-if ='!invoice.details.status'>Situação:</div>
				<div class="col text-red-5" v-else>Situação:</div>

				<div class="col text-right text-teal q-pr-md" v-if ='!invoice.details.status'>
				    Paga
				</div>

				<div class="col text-right text-red-5 q-pr-md" v-else>
					Não Paga
				</div>
			</div>

			<hr class="text-center q-ma-sm" />

			<div class="row q-pa-sm ">
				<div class="col text-bold">Total :</div>
				<div class="col text-right q-pr-md">
					{{ invoice.details.total || 0 }} ,00 MT
				</div>
			</div>
		</div>
		<div class="row">
		
		<div class="q-pt-md col " >
			<q-btn
			
				color="primary"
				no-caps
				unelevated
				icon="done"
				label=" Paga ?  "
				v-if="invoice.details.status"
		
				@click="pagar(invoice)"
			/>
		</div>

		<div class="q-pt-md col " >
			<q-btn
				color="red-5"
				no-caps
				class=" full-width"
				unelevated
				icon="delete"
				label="Remover"
					@click="$emit('deleteinvoice',invoiceId)"
			/>
		</div>
		</div>
	</q-card-section>
	
</q-card>	

</template>

<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'invoiceBodyComponent',
		props: ['invoice','invoiceId'],
		components: {  },
		data() {
			return {
				dialog: false,
				
			};
		},
		computed: {
				...mapState('invoice', [
				'invoices',
            ]),
		},
		mounted() {
			// console.log(this.invoice)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('invoice', ['editInvoice']),
				
			pagar(val) {

			
			val.details.status = false	


			this.editInvoice({
				id : val.id,
				updates : {details : val.details }
			})
			},
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
	.active-class {
		background: rgb(240, 240, 240);
	}
</style>
