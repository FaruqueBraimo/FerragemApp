<template>
	<tr>
		<td class="text-left">
			<q-avatar  text-color="white">
				<q-img
         src="https://img.icons8.com/dotty/80/000000/businessman.png"				/>
			</q-avatar>

			{{ user.name }}
		</td>
		<td class="text-left">{{ user.email }}</td>
		<td class="text-left ">
			<q-select
        label=" 'Não definido'"
        transition-show="jump-up"
        transition-hide="jump-up"
        filled
        v-model="user.email"
        
        :options="options"
        style="width: 250px"
      />
    </div>
		</td>

		<td class="text-center ">
			{{ user.createdAt | dateFormat }}
		</td>

		<td class="text-center ">
			{{ user.createdAt | dateFormat }}
		</td>

    	<td class="text-center ">
      <q-btn outline unelevated  text-color="secondary" label="Activar" icon="toggle_on" />
      <q-btn  flat  rounded text-color="primary" icon="visibility" />
      <q-btn  flat  rounded text-color="red" icon="delete" @click="$emit('deleteUser')" />


		</td>
	</tr>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	export default {
		name: 'UserBodyComponent',
		props: ['user'],
		data() {
			return {
				role: null,
				options: [
					'Administrador',
					'Acesso somente aos Produtos e Categorias',
					'Acesso aos Clientes e Fornecedores',
					'Acesso a gestão de Stock',
					'Nenhum Acesso'
				]
			};
		},
		computed: {
			userRoleName() {
				return this.user.role ? this.user.role : 'Outro';
			}
		},
		mounted() {
			// console.log(this.user)
		},
		methods: {
			...mapActions('settings', ['setGlobalConfirm']),
			...mapActions('auth', ['updateUser'])
		},
		filters: {
			dateFormat(val) {
				var months = [
					'Janeiro',
					'Fevereiro',
					'Março',
					'Abril',
					'Maio',
					'Junho',
					'Julho',
					'Agosto',
					'Setembro',
					'Outubro',
					'Novembro',
					'Dezembro'
				];
				let dateCreated = new Date(val.seconds * 1000);
				return (
					dateCreated.getDate() +
					' de ' +
					months[dateCreated.getMonth()] +
					' de ' +
					dateCreated.getFullYear()
				);
			}
		}
	};
</script>

<style scoped>
	.active-class {
		background: rgb(240, 240, 240);
	}
</style>
