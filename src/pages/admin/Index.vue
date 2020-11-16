<template>
	<q-page padding class="q-pt-sm">
		<div class="row  q-pa-md justify-center items-center">
			<div class="col q-pa-sm">
				<q-card class="report-card text-grey-10" bordered>
					<q-card-section>
						<div class="row">
							<div
								class=" col "
								v-if="Object.keys(categories).length > 0"
							>
								<div>Categorias</div>
								<span class="text-green-5 text-h4">
									{{ Object.keys(categories).length }}</span
								>
							</div>
							<q-skeleton type="QRadio" v-else />

							<div class=" col text-right text-green-5 q-pa-md ">
								<q-icon
									name="apps"
									style="font-size: 3.0em;"
								/>
							</div>
						</div>

						<div>
							<q-linear-progress
								indeterminate
								color="green-5"
								class="q-mt-sm"
							/>
						</div>
					</q-card-section>
				</q-card>
			</div>

			<div class="col q-pa-sm">
				<q-card class="report-card text-grey-10" bordered>
					<q-card-section>
						<div class="row">
							<div
								class=" col "
								v-if="Object.keys(products).length > 0"
							>
								<div>Produtos</div>
								<span class="text-primary text-h4">
									{{ Object.keys(products).length }}</span
								>
							</div>
							<q-skeleton type="QRadio" v-else />

							<div class=" col text-right text-primary q-pa-md ">
								<q-icon
									name="shopping_cart"
									style="font-size: 3.0em;"
								/>
							</div>
						</div>

						<div>
							<q-linear-progress
								indeterminate
								color="primary"
								class="q-mt-sm"
							/>
						</div>
					</q-card-section>
				</q-card>
			</div>

			<div class="col q-pa-sm">
				<q-card class="report-card text-grey-10" bordered>
					<q-card-section>
						<div class="row">
							<div
								class=" col "
								v-if="Object.keys(providers).length > 0"
							>
								<div>Fornecedores</div>
								<span class="text-deep-orange text-h4">
									{{ Object.keys(providers).length }}</span
								>
							</div>
							<q-skeleton type="QRadio" v-else />

							<div
								class=" col text-right text-deep-orange q-pa-md "
							>
								<q-icon
									name="person"
									style="font-size: 3.0em;"
								/>
							</div>
						</div>

						<div>
							<q-linear-progress
								indeterminate
								color="deep-orange"
								class="q-mt-sm"
							/>
						</div>
					</q-card-section>
				</q-card>
			</div>

			<div class="col q-pa-sm">
				<q-card class="report-card text-grey-10" bordered>
					<q-card-section>
						<div class="row">
							<div
								class=" col "
								v-if="Object.keys(users).length > 0"
							>
								<div>Utilizadores</div>
								<span class="text-secondary text-h4">
									{{ Object.keys(users).length }}</span
								>
							</div>
							<q-skeleton type="QRadio" v-else />

							<div
								class=" col text-right text-secondary q-pa-md "
							>
								<q-icon
									name="group"
									style="font-size: 3.0em;"
								/>
							</div>
						</div>

						<div>
							<q-linear-progress
								indeterminate
								color="secondary"
								class="q-mt-sm"
							/>
						</div>
					</q-card-section>
				</q-card>
			</div>
		</div>

		<div class="row ">
			<div class="col-12 q-px-lg  text-primary"> Empresa  :  <span class="text-blue-grey-10">N-FACILIDADES Sociedade Unipessoal Lda</span>  </div>	
          
		  <div class="col-12 q-px-lg q-py-md text-primary"> Sede  :  <span class="text-blue-grey-10"> Zambézia Milange</span>  </div>	

			<div class="col-12 q-px-lg text-primary"> Nuit  :  <span class="text-blue-grey-10">401151192</span>  </div>	

			<div class="col-12 q-px-lg q-py-md text-primary"> Contacto  :  <span class="text-blue-grey-10">845488304/864023773</span>  </div>	
			<div class="col-12 q-px-lg text-primary"> Email  :  <span class="text-blue-grey-10"> noeafonso1@gmail.com</span>  </div>	

		</div>

		<div class="row bg-primary text-white  absolute-bottom text-center justify-center q-pa-md ">
			 
		Copyright ©2020 FSTOCK - N-FACILIDADES Sociedade Unipessoal Lda. Todos Direitos Reservados. faruquebraimo@gmail.com / 846771216
					
		 </div>

		 
		 

	</q-page>
	
</template>

<script >


	import { mapActions, mapState } from 'vuex';
	

	import { date } from 'quasar';


	export default {
		components: {},
		data() {
			return {
				chartData: {

					labels: ['January', 'February'],
					datasets: [
						{
							label: 'Data One',
							backgroundColor: '#f87979',
							data: [40, 20]
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false
				}
			};
		},
		
		computed: {
			...mapState('auth', ['users', 'userAuth']),
			...mapState('category', ['categories', ]),
			...mapState('product', ['products',]),
			...mapState('provider', ['providers', ]),
		},

meta: {
  meta: {
      description: { name: 'description', content: 'Page 1' },
  
}




		},
		mounted () {
				
		},
		
		methods: {

			connection() {
				
			}
		}
	};
</script>
<style>
    .fixarRodape {
        bottom: 0;
        position: fixed;
        width: 90%;
        text-align: center;
    }
</style>
<style scoped>
	.report-card {
    box-shadow:none;
		min-height: 20vh;
		max-height: 20vh;
	}
</style>
