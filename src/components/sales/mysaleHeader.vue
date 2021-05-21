<template>
	<thead>
		<tr>
			<th >
				<div class="row items-center">
				
					<div class=" col  text-right">
						<q-select
							
							label="Data "
							square
							v-model="filterCategory"
							filled
							:options="optionalcategory"
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
                optionalTrade: ['Mais Vendidos'],
				optionalUsers: [],
				userSelected: ''


			};
		},
		computed: {
			...mapState('auth', ['users']),


		
		},
		methods: {
			
			
		},
		mounted() {
          
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
				this.$emit('filterCategory',  val)	
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
