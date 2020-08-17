<template>
	<thead>
		<tr>
			<th colspan="8">
				<div class="row no-wrap items-center">
					<q-img
						style="width: 70px"
						:ratio="1"
						class="rounded-borders"
						src="https://img.icons8.com/officel/80/000000/supplier.png"/>
					

					<div class="text-h6 q-ml-md text-secondary">Fornecedores</div>
				
					<div class=" col q-pl-sm ">
						<template>
							<q-input
								v-model="search"
								dense
								debounce="300"
								placeholder="Pesquise pelo nome"
								square
								filled
							>
								<template v-slot:append>
									<q-icon
										v-if="search !== ''"
										name="close"
										@click="search = ''"
										class="cursor-pointer"
									/>
									
								</template>
								
							</q-input>

						</template>
						
						
					</div>
				<q-btn color="primary"   outline label="OK" @click="emitCodeData" />




						<div class=" col q-pl-sm ">
						<template>
							<q-input
								v-model="referenceSearch"
								dense
								debounce="300"
								placeholder="Pesquise pelo nuit"
								square
								filled
							>
								<template v-slot:append>
									<q-icon
										v-if="referenceSearch !== ''"
										name="close"
										@click="referenceSearch = ''"
										class="cursor-pointer"
									/>
									
								</template>
							</q-input>
						</template>
						
					</div>

				<q-btn color="primary"   outline label="OK" @click="emitData" />



				</div>
			</th>
		</tr>

		<tr >
			<th class="text-left " style="font-weight: bold">#</th>
			<th class="text-left " style="font-weight: bold">Nome</th>
			<th class="text-left " style="font-weight: bold">Tipo de fonecedor</th>
			<th class="text-center " style="font-weight: bold">Endereço</th>
			<th class="text-left " style="font-weight: bold">Email</th>
			<th class="text-left " style="font-weight: bold">Telefone</th>
			<th class="text-center " style="font-weight: bold">Nuit</th>
			<th class="text-center " style="font-weight: bold">Acção</th>
		</tr>
	</thead>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'UserHeaderComponent',
		data() {
			return {
				optionalcategory: ['Todas'],
                filterCategory :'',
				search: '',
				referenceSearch : ''
			};
		},


			methods: {
			...mapActions('provider', ['listenProviderRealTimeChanges']),

			emitData(){
				this.$emit('filterByNuit', this.referenceSearch)
			},

			emitCodeData(){
						this.$emit('filterByName', this.search)


			},

			
		},
		watch: {
			search(val) {
				if (!val) {
					this.listenProviderRealTimeChanges();
				}
				// else {
				// 	this.$emit('productFilter', this.search)

				// }
			}
					,
			referenceSearch(val) {
				if (!val) {
					this.listenProviderRealTimeChanges();
					
				}
			},


			

		}
	};
</script>

<style scoped></style>
