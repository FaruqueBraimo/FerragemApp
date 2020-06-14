<template>
	<thead>
		<tr>
			<th colspan="7">
				<div class="row no-wrap items-center">
					<q-img
						style="width: 70px"
						:ratio="1"
						class="rounded-borders"
						src="https://img.icons8.com/officel/80/000000/supplier.png"/>
					

					<div class="text-h6 q-ml-md text-secondary">Fornecedores</div>
				</div>
			</th>
		</tr>

		<tr >
			<th class="text-left " style="font-weight: bold">Nome</th>
			<th class="text-left " style="font-weight: bold">Tipo de fonecedor</th>
			<th class="text-center " style="font-weight: bold">Endereço</th>
			<th class="text-left " style="font-weight: bold">Email</th>
			<th class="text-left " style="font-weight: bold">Telefone</th>
			<th class="text-center " style="font-weight: bold">Data de Registo</th>
			<th class="text-center " style="font-weight: bold">Acção</th>
		</tr>
	</thead>
</template>

<script>
	export default {
		name: 'UserHeaderComponent'
	};
</script>

<style scoped></style>
