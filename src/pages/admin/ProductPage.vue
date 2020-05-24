<template>
	<div class="q-pa-lg">
		<q-card class="q-pa-md">
			<q-table
				ref="myTable"
				:class="tableClass"
				tabindex="0"
				title="Lista de Produtos"
				:data="data"
				:columns="columns"
				row-key="name"
				:pagination.sync="pagination"
				:filter="filter"
				@focusin.native="activateNavigation"
				@focusout.native="deactivateNavigation"
				@keydown.native="onKey"
			>
				<template v-slot:top-right>
					<q-input
						outline
						dense
						debounce="300"
						v-model="filter"
						placeholder="Pesquisar"
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>
			</q-table>
		</q-card>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				navigationActive: false,
				filter: '',
				pagination: {},
				columns: [
					{
						name: 'name',
						required: true,
						label: 'Nome',
						align: 'left',
						field: row => row.name,
						format: val => `${val}`,
						sortable: true
					},
					{
						name: 'category',
						align: 'center',
						label: 'Categoria',
						field: 'category',
						sortable: true
					},
					{
						name: 'price',
						align: 'center',
						label: 'Preco',
						field: 'price',
						sortable: true
					},
					{
						name: 'quantity',
						align: 'center',

						label: 'Quantidade',
						field: 'quantity',
						sortable: true
					},
					{
						name: 'utility',
						align: 'center',

						label: 'Finalidade',
						field: 'utility',
						sortable: true,
						sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
					},
					{
						name: 'Operacoes',
						label: 'Operacoes',
						field: 'iron',
						sortable: true,
						sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
					}
				],
				data: [
					{
						id: 1,
						name: 'Ferro 8',
						category: 'Ferros',
						price: 120,
						quantity: 1200,
						utility: 'Venda',
						protein: 4.0
					},
					{
						id: 1,
						name: 'Ferro 12',
						category: 'Ferros',
						price: 120,
						quantity: 1200,
						utility: 'Venda',
						protein: 4.0
					},
					{
						id: 1,
						name: 'Parafuso M8',
						category: 'Parafusos',
						price: 12,
						quantity: 700,
						utility: 'Uso Interno',
						protein: 4.0
					}
				]
			};
		},

		computed: {
			tableClass() {
				return this.navigationActive === true
					? 'shadow-8 no-outline'
					: void 0;
			}
		},

		methods: {
			activateNavigation() {
				this.navigationActive = true;
			},

			deactivateNavigation() {
				this.navigationActive = false;
			},

			onKey(evt) {
				if (
					this.navigationActive !== true ||
					[33, 34, 35, 36, 38, 40].indexOf(evt.keyCode) === -1 ||
					this.$refs.myTable === void 0
				) {
					return;
				}

				evt.preventDefault();

				const { computedRowsNumber, computedRows } = this.$refs.myTable;

				if (computedRows.length === 0) {
					return;
				}

				const currentIndex =
					this.selected.length > 0
						? computedRows.indexOf(this.selected[0])
						: -1;
				const currentPage = this.pagination.page;
				const rowsPerPage =
					this.pagination.rowsPerPage === 0
						? computedRowsNumber
						: this.pagination.rowsPerPage;
				const lastIndex = computedRows.length - 1;
				const lastPage = Math.ceil(computedRowsNumber / rowsPerPage);

				let index = currentIndex;
				let page = currentPage;

				switch (evt.keyCode) {
					case 36: // Home
						page = 1;
						index = 0;
						break;
					case 35: // End
						page = lastPage;
						index = rowsPerPage - 1;
						break;
					case 33: // PageUp
						page = currentPage <= 1 ? lastPage : currentPage - 1;
						if (index < 0) {
							index = 0;
						}
						break;
					case 34: // PageDown
						page = currentPage >= lastPage ? 1 : currentPage + 1;
						if (index < 0) {
							index = rowsPerPage - 1;
						}
						break;
					case 38: // ArrowUp
						if (currentIndex <= 0) {
							page =
								currentPage <= 1 ? lastPage : currentPage - 1;
							index = rowsPerPage - 1;
						} else {
							index = currentIndex - 1;
						}
						break;
					case 40: // ArrowDown
						if (currentIndex >= lastIndex) {
							page =
								currentPage >= lastPage ? 1 : currentPage + 1;
							index = 0;
						} else {
							index = currentIndex + 1;
						}
						break;
				}

				if (page !== this.pagination.page) {
					this.pagination = {
						...this.pagination,
						page
					};

					this.$nextTick(() => {
						const { computedRows } = this.$refs.myTable;
						this.selected = [
							computedRows[
								Math.min(index, computedRows.length - 1)
							]
						];
					});
				} else {
					this.selected = [computedRows[index]];
				}
			}
		}
	};
</script>
