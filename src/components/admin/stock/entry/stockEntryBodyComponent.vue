<template>
	<thead>
		<tr>
			<th colspan="7">
				<div class="row no-wrap items-center">
					<q-img
						style="width: 70px"
						:ratio="1"
						class="rounded-borders"
						src="https://img.icons8.com/dusk/64/000000/user.png"/>
					

					<div class="text-h6 q-ml-md text-secondary">Clientes</div>
				</div>
			</th>
		</tr>

		<tr>
			<th class="text-left " style="font-weight: bold">Nome</th>
			<th class="text-left " style="font-weight: bold">Tipo de Cliente</th>
			<th class="text-center " style="font-weight: bold">Data de Registo</th>
			<th class="text-left q-pl-md " style="font-weight: bold">Acção</th>
		</tr>
	</thead>
</template>

<script>
	export default {
		name: 'CustomerHeaderComponent'
	};
</script>

<style scoped></style>
