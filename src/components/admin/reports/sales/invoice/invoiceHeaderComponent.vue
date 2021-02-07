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
                    

					<div class="text-h6 col-1 text-secondary">Facturas</div>
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
							label="Por Cliente "
							square
							filled
							v-model="userSelected"
							:options="optionalUsers"
						/>
						
					</div>

                    <div class=" col q-ml-md justify-right text-right">
				<q-select
							dense
							label="Por Produto	 "
							square
							v-model="productSelected"
							
							filled
							:options="optionalProducts"
						/>
						
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
                optionalProducts: [],
				optionalUsers: [],
				userSelected: '',
				productSelected: ''


			};
		},
		computed: {
			...mapState('auth', ['users']),
...mapState('product', ['products']),
...mapState('customer', ['customers']),

		
		},
		methods: {
			...mapActions('product', ['listenProductRealTimeChanges']),
			
			fetchUsers() {
				Object.keys(this.customers).forEach((element, key) => {
					this.optionalUsers.push({
						value: element,
						label: this.customers[element].name
					});
				});

			},

				fetchProducts() {
				Object.keys(this.products).forEach((element, key) => {
					this.optionalProducts.push({
						value: element,
						label:this.products[element].name
					});
				});

			}
			
		},
		mounted() {
			this.fetchUsers()
			this.fetchProducts()
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
				this.$emit('filterCategory',  {value:val, type : 'date'})	
				}
			},


			userSelected(val) {
				if (val) {
				this.$emit('filterByUser', {value:val.value, type : 'user'})	
				}
			}
		}
	};
</script>

<style scoped></style>
