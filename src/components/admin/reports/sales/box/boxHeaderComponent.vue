<template>
	

	<thead>
		<tr>
			<th colspan="8">
				<div class="row no-wrap items-center">
					<q-img
						style="width: 70px"
						:ratio="1"
						class="rounded-borders"
					src="https://img.icons8.com/office/80/000000/box.png"
					/>
                                                       


					<div class="text-h6 col text-secondary">Fluxo de Caixa</div>
					<div class=" col  q-ml-md justify-right text-right">
						<q-select
							dense
							disable
							label="Filtrar por data de emissão"
							square
							v-model="filterCategory"
							filled
							:options="optionalcategory"
						/>
						
					</div>
              
                    <div class=" col  q-ml-md justify-right text-right">
						<q-select
							dense
							label="Por Funcionário "
							square
							disable
							filled
							:options="optionalUsers"
						/>
						
					</div>

                    <div class=" col q-ml-md justify-right text-right">
					<q-input disable filled v-model="date" placeholder='Data aleatoria' dense>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="date" mask="DD-MM-YYYY "  />
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                        
	  </q-input>
						
					</div>
					<div class=" col  q-ml-md justify-right text-right">
						<q-btn
							no-caps
							class=" full-width"
							unelevated
							:label=" !openHistory ? 'Historico de Caixa' : 'Ocultar Historico' "
							:color="!openHistory ? 'primary' : 'red-5'"
							icon="timeline"
							@click="$emit('openHistory' , true)"
						/>
					</div>
					
				</div>

						
				</div>

			</th>
		</tr>

		<tr class="text-bold" style="font-weight: bold" v-if='openHistory'>
			<th class="text-left text-bold" style="font-weight: bold">
				Data  
			</th>

			<th class="text-left text-bold" style="font-weight: bold">Hora de Abertura</th>
			<th class="text-left text-bold" style="font-weight: bold">
				Hora de Fechamento
			</th>
			<th class="text-left text-bold" style="font-weight: bold">
			Montante Inicial			
			</th>

			<th class="text-left text-bold" style="font-weight: bold">
			Montante Final		
			</th>
			<th class="text-left text-bold" style="font-weight: bold">
			Vendedor			
			</th>
		
			<th class="text-left text-bold" style="font-weight: bold">
				Acção
			</th>
		</tr>
	</thead>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'ProductHeaderComponent',
		props:['openHistory'],

		data() {
			return {
				optionalcategory: [
					'Todas',
					'De Hoje',
					'De Ontém',
					'Esta Semana',
					'Deste Mês',
					'Deste Ano'
				],
				filterCategory: '',
				date: '',
				optionalTrade: ['Mais Vendidos'],
				optionalUsers: []
			};
		},
		computed: {
			...mapState('auth', ['users'])
		},
		methods: {
			...mapActions('product', ['listenProductRealTimeChanges']),
			fetchUsers() {
				Object.keys(this.users).forEach((element, key) => {
					this.optionalUsers.push({
						value: element,
						label: this.users[element].name
					});
				});
			}
		},
		mounted() {
			this.fetchUsers();
		},

		watch: {
			search(val) {
				if (!val) {
					this.listenProductRealTimeChanges();
				} else {
					this.$emit('productFilter', this.search);
				}
			},

			filterCategory(val) {
				if (val) {
					this.$emit('filterCategory', val);
				}
			}
		}
	};
</script>

<style scoped></style>
