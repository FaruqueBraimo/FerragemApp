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

					<div class="text-h6  q-ml-md text-secondary">Produtos</div>
					<div class="text-h6 justify-right text-right col q-pr-xl"></div>
				</div>
			</th>
		</tr>

		<tr class="text-bold" style="font-weight: bold" >
			<th class="text-left text-bold" style="font-weight: bold" >Codigo de Barra</th>

			<th class="text-left text-bold" style="font-weight: bold" >Nome</th>
			<th class="text-left text-bold" style="font-weight: bold">Categoria</th>
			<th class="text-left text-bold" style="font-weight: bold">Quantidade</th>
			<th class="text-left text-bold" style="font-weight: bold">Preco de Venda</th>

			<th class="text-left " style="font-weight: bold">Forncedor</th>

			<th class="text-center text-bold" style="font-weight: bold" >Data de Registo</th>
			<th class="text-center text-bold" style="font-weight: bold">Acção</th>
		</tr>
	</thead>
</template>

<script>
	export default {
		name: 'UserHeaderComponent'
	};
</script>

<style scoped></style>
