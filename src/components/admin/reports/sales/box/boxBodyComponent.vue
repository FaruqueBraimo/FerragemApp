<template>
	
<q-card class="my-card" square>
	<q-card-section>
		<div id="printMe" >
			
			<div class="row q-pa-sm text-bold ">
				<div class="col-6 text-left">
					Caixa nr:
				</div>
				<div class="col text-right q-pr-md">
				     <q-badge color="deep-orange" text-color="white" :label="count+1" />

				</div>

			</div>

			<div class="row q-pa-sm text-indigo ">
				<div class="col">Dinheiro :</div>
				<div class="col text-right q-pr-md">
					{{
						box.value
					}}, 00MT
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Hora de abertura:</div>
				<div class="col text-right q-pr-md">
					{{ box.createdAt  | dateFormat  }}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Vendedor:</div>
				<div class="col text-right q-pr-md">
					{{ box.createdBy.name || ''   }}
				</div>
			</div>

			<hr class="text-center q-ma-sm" />

			<div class="row q-pa-sm ">
				<div class="col text-bold">Estado :</div>
				<div v-if="box.status" class="col text-right text-green q-pr-md">
					Aberto
				</div>
				<div v-else class="col text-right text-red q-pr-md">
					Fechado
				</div>
			</div>
		</div>
		</div>
		<div class="q-pt-md col-12" >
			<q-btn
				no-caps
				class=" full-width"
				unelevated
					v-if="box.status"
				label="Fechar"

				
						color="red-5"
						icon="close"
			
						@click="$emit('closeBox',boxId)"
			/>
		</div>
	</q-card-section>
	
</q-card>	


</template>

<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'boxBodyComponent',
		props: ['box','boxId', 'count'],
		components: {  },
		data() {
			return {
				dialog: false,
				
			};
		},
		computed: {
				...mapState('box', [
				'boxs',
            ]),
		},
		mounted() {
			// console.log(this.box)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('box', ['updatebox'])
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
					dateCreated.getHours() +
					'h' + ':' +
					dateCreated.getMinutes()
					
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
