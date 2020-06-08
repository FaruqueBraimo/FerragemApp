<template>
	<thead>
		<tr>
			<th colspan="8">
				<div class="row no-wrap items-center">
					<q-img
						style="width: 70px"
						:ratio="1"
						class="rounded-borders"
						src="https://img.icons8.com/nolan/64/product.png"
					/>

					<div class="text-h6 col-1 text-secondary">Produtos</div>
					<div class=" col-9  q-ml-xl justify-right text-right">
						<template>
							<q-input
								v-model="search"
								dense
								debounce="300"
								placeholder="Pesquise Pelo nome do Producto"
							>
							
							</q-input>
						</template>
						
					</div>

					<div class=" col-1 ">
						    <q-btn round color="secondary" icon="search"  @click="$emit('productFilter',search)" />

						
					</div>
				</div>
			</th>
		</tr>

		<tr class="text-bold" style="font-weight: bold">
			<th class="text-left text-bold" style="font-weight: bold">
				Codigo de Barra
			</th>

			<th class="text-left text-bold" style="font-weight: bold">Nome</th>
			<th class="text-left text-bold" style="font-weight: bold">
				Categoria
			</th>
			<th class="text-left text-bold" style="font-weight: bold">
				Quantidade
			</th>
			<th class="text-left text-bold" style="font-weight: bold">
				Preco de Venda
			</th>

			<th class="text-left " style="font-weight: bold">Forncedor</th>

			<th class="text-center text-bold" style="font-weight: bold">
				Data de Registo
			</th>
			<th class="text-center text-bold" style="font-weight: bold">
				Acção
			</th>
		</tr>
	</thead>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		name: 'ProductHeaderComponent',

		data(){
			return{
				search:''
			}
		},
			methods: {

			...mapActions('product' , ['listenProductRealTimeChanges']),
		

		},

		watch :{
			search(val)	{
				if(!val){
					this.listenProductRealTimeChanges()
				}
			}
		}
		

	};
</script>

<style scoped></style>
