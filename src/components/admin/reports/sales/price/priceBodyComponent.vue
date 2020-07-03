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

				<div class="row q-pa-sm" v-for="i in price.products" :key="i" >
					<div class="col">{{ i.payload.name }}</div>

					<div class="col text-right q-pr-md">
						{{ i.payload.qtdUnit }}
					</div>

					<div class="col text-right q-pr-md">
						{{ i.payload.price }},00 MT
					</div>
			
			</div>
			<hr class="text-center q-ma-sm" />

			<div class="row q-pa-sm  ">
				<div class="col-6 text-left">
					Desconto de Iva :
				</div>
				<div class="col text-right q-pr-md">
					{{ price.details.iva || 0 }}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Cliente :</div>
				<div class="col text-right q-pr-md">
					{{
						price.details.client
							? price.details.client.label
							: 'Nao informado'
					}}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Prazo de entrega:</div>
				<div class="col text-right q-pr-md">
					{{ price.details.deadline  || 'Nenhum' }}
				</div>
			</div>

			<!-- <div class="row q-pa-sm ">
				<div class="col text-teal" v-if ='price.details.status'>Situação:</div>
				<div class="col text-red-5" v-else>Situação:</div>
				<div class="col text-right text-teal q-pr-md" v-if ='price.details.status'>
				    Em Vigor
				</div>

				<div class="col text-right text-red-5 q-pr-md" v-else>
					Fora do limite
				</div>
			</div> -->

			<hr class="text-center q-ma-sm" />

			<div class="row q-pa-sm ">
				<div class="col text-bold">Total :</div>
				<div class="col text-right q-pr-md">
					{{ price.details.subtotal || 0 }} ,00 MT
				</div>
			</div>
		</div>
		<div class="row">
		<div class="q-pt-md col " >
			<q-btn
				color="teal"
				no-caps
				class=" "
				unelevated
				icon="receipt"
				label="Imprimir a cot."
				@click="printTable"
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
					@click="$emit('deleteprice',priceId)"
			/>
		</div>
		</div>
	</q-card-section>
	
</q-card>	

</template>

<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'priceBodyComponent',
		props: ['price','priceId'],
		components: {  },
		data() {
			return {
				dialog: false,
				
			};
		},
		computed: {
				...mapState('price', [
				'prices',
            ]),
		},
		mounted() {
			// console.log(this.price)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('price', ['updateprice']),
				
			printTable() {
				this.$htmlToPaper('printMe');
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
