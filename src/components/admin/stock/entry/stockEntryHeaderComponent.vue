<template>
	<thead>
		<tr>
			<th colspan="7">
				<div class="row no-wrap items-center">
					<q-img
						style="width: 70px"
						:ratio="1"
                        
						class="rounded-borders    "
 src="https://img.icons8.com/material-rounded/48/000000/import.png"/>					

					<div class="text-h6 q-ml-md text-secondary">Produtos Importados </div>
				</div>
			</th>
		</tr>

		<tr>
			<th class="text-left " style="font-weight: bold">Produto</th>
			<th class="text-left " style="font-weight: bold">Fornecedor</th>
			<th class="text-center " style="font-weight: bold">Quantidade antiga</th>
			<th class="text-center " style="font-weight: bold">Quantidade nova</th>
			<th class="text-center " style="font-weight: bold">Data de entrada</th>
			<th class="text-left  " style="font-weight: bold">Acção</th>
		</tr>
	</thead>
</template>

<script>
	export default {
		name: 'CustomerHeaderComponent'
	};
</script>

<style scoped></style>
