<template>
	<thead>
		<tr>
			<th >
				<div class="row no-wrap items-center">
					<q-img
						style="width: 70px"
						:ratio="1"
						class="rounded-borders"
						src="https://img.icons8.com/plasticine/100/000000/yard-sale.png"
					/>
                    

					<div class="text-h6 col-1 text-secondary">Vendas</div>
					<div class=" col  q-ml-md justify-right text-right">
						<q-select
							dense
							label="Filtrar venda por data "
							square
							v-model="filterCategory"
							filled
							:options="optionalcategory"
						/>
						
					</div>
                    <!-- <div class=" col-2  q-ml-md justify-right text-right">
						<q-select
							dense
							label="Tendências "
							square
							v-model="optionalTrade"
							filled
							:options="optionalTrade"
						/>
						
					</div> -->

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
					<q-input  disable filled v-model="date" placeholder='Data aleatoria' dense>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="date" mask="DD-MM-YYYY "  />
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                        
	  </q-input>
						
					</div>
					
				</div>
			</th>
		</tr>

	</thead>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'ProductHeaderComponent',

		data() {
			return {
				optionalcategory: ['Todas','De Hoje' , 'De Ontém' ,'Esta Semana', 'Deste Mês' ,'Deste Ano'],
                filterCategory :'',
                date: '',
                optionalTrade: ['Mais Vendidos'],
                optionalUsers: [],


			};
		},
		computed: {
			...mapState('auth', ['users']),

		
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
            this.fetchUsers()
		},

		watch: {
			search(val) {
				if (!val) {
					this.listenProductRealTimeChanges();
				}
				else {
					this.$emit('productFilter', this.search)

				}
				
			},

			filterCategory(val) {
				if (val) {
				this.$emit('filterCategory', val)	
				}
			}
		}
	};
</script>

<style scoped></style>
