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
						invoice.details.client.label
							
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
				class="full-width"
				color="secondary"
				no-caps
				unelevated
				icon="done"
				label=" Liquidar Fatura  "
				v-if="invoice.details.status"
		
				@click="pagar(invoice)"
			/>
		</div>

		<!-- <div class="q-pt-md col  q-px-xs" >
			<q-btn
				class="full-width"
				color="deep-orange"
				no-caps
				unelevated
				
				label=" Pagar parcialmente  "
				v-if="invoice.details.status"
		
				@click="pagarParcial(invoice)"
			/>
		</div> -->

		
		</div>
	</q-card-section>
	
</q-card>	

</template>

<script>
	import { mapActions, mapState, mapGetters  } from 'vuex';
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
						...mapGetters('auth', ['getUserName', 'getUserAuth']),

		},
		mounted() {
			// console.log(this.invoice)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('invoice', ['editInvoice']),

			pagarParcial(val) {

		this.$q.dialog({
        title:   'Parcela em MT ',
        message: 'Indruza o valor do pagamento parcial da factura',
        prompt: {
          model: 'parcela',
          type: 'number' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
		 let 	parcial = {
				date : new Date(),
				amount :  ~~data,
				updatedBy : this.getUserAuth.name

			}
			val.details.statusParcial = true	

		if(val.parcial) {
		   
		   if( (val.parcial.amount + parcial.amount)  >= val.details.total ) {
				val.statusParcial = false
				console.log('verdade')
			
			const resto = val.details.total - val.parcial.amount 

			if (parcial.amount  > resto) {
				console.log('Parcela superior ao valor remanescente da factura')
			}
			else {
				val.parcial.amount = val.parcial.amount + parcial.amount

				this.editInvoice({
				id : val.id,
				updates : val
			})

			}  
}

		 } else {
			 			val.parcial = parcial

		 }

		 	

		 
		 

      })

		


		
			},
				
			pagar(val) {

			
			val.details.status = false	
			invoice.details.confirmad = this.getUserAuth.name


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
