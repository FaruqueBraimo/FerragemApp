<template>
	
<q-card class="my-card">
	<q-card-section>
		<div id="printMe" >
			

			<div class="row q-pa-sm ">
				<div class="col text-bold text-grey-7">Produto</div>

				<div class="col  text-bold text-grey-7 text-right q-pr-md">
					Quantidade
				</div>

				<div class="col  text-bold text-grey-7 text-right q-pr-md">
					Preço
				</div>
			</div>

				<!-- <div class="row q-pa-sm" v-for="i in sale.products" :key="i" >
					<div class="col">{{ i.payload.name }}</div>

					<div class="col text-right q-pr-md">
						{{ i.payload.qtdUnit }}
					</div>

					<div class="col text-right q-pr-md">
						{{ i.payload.price }},00 MT
					</div>
			
			</div> -->
			<hr class="text-center q-ma-sm" />


			<div class="row q-pa-sm ">
				<div class="col">Cliente :</div>
				<div class="col text-right q-pr-md">
					{{
						sale.details.client
							
					}}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Data de Venda:</div>
				<div class="col text-right q-pr-md">
					{{ sale.createdAt  | dateFormat  }}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Vendedor:</div>
				<div class="col text-right q-pr-md">
					{{  users[sale.details.salesMan].name || ''   }}
				</div>
			</div>

			<hr class="text-center q-ma-sm" />

			<div class="row q-pa-sm ">
				<div class="col text-bold">Total :</div>
				<div class="col text-right q-pr-md">
					{{ sale.details.subtotal || 0 }} ,00 MT
				</div>
			</div>
		</div>
		<div class="q-pt-md col-12" >
			<q-btn
				no-caps
				class=" full-width"
				unelevated
			
				label="Apagar"

				
						color="red-5"
						icon="delete"
						
						@click="$emit('deletesale',saleId)"
			/>
		</div>
	</q-card-section>
	
</q-card>	


</template>

<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'saleBodyComponent',
		props: ['sale','saleId'],
		components: {  },
		data() {
			return {
				dialog: false,
				
			};
		},
		computed: {
				...mapState('sale', [
				'sales',
			]),
			
				...mapState('user', [
				'users',
            ]),
		},
		mounted() {
			// console.log(this.sale)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('sale', ['updatesale'])
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
