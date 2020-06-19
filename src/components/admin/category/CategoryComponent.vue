<template>
	<span>
		<q-card
			clickable
			v-ripple
			class="my-card bg-white"
			flat
			bordered
			square
			@click="productFilterCategory({ value: category.id })"
		>
			<div class="text-left q-pa-sm	">
				<!-- <q-chip square size="sm">
					<q-avatar color="red-4" text-color="white">50</q-avatar>
					Productos
				</q-chip> -->
			</div>
			<q-btn
				flat
				icon="more_horiz"
				class="absolute-top-right "
				text-color="grey-8"
			>
				<q-menu>
					<q-list style="min-width: 100px">
						<q-item clickable v-close-popup>
							<q-item-section
								@click="$emit('updateCategory', category)"
								>Editar</q-item-section
							>
						</q-item>
						<q-item clickable v-close-popup class="text-red">
							<q-item-section
								@click="$emit('removeCategory', idCategory)"
								>Remover
							</q-item-section>
						</q-item>
					</q-list>
				</q-menu>
			</q-btn>
			<q-card-section class="text-center">
				<q-avatar :color="getColor" text-color="white">{{
					category.name | getNames
				}}</q-avatar>
			</q-card-section>

			<div class=" text-body1 text-bold text-center q-pb-lg ">
				{{ category.name }}
			</div>

			<q-tooltip
				content-class="bg-secondary text-white shadow-4 text-caption"
				:offset="[10, 10]"
			>
				{{ category.description || 'Sem  Descrição' }}
			</q-tooltip>
			<!-- TODO: transformar essa pora em component  -->
			<q-dialog v-model="dialog">
				<q-card style="width: 700px; max-width: 80vw;">
					<q-card-section
						class="q-pt-none"
						v-if="Object.keys(productFilteredCategory).length > 0"
					>
						<q-list padding class="rounded-borders">
							<q-item-label header class="text-h6"
								>Productos desta categoria
							</q-item-label>
							<span>
								<categoryDetails
									v-for="product in productFilteredCategory"
									:key="product.id"
									:product="product"
								/>
							</span>
						</q-list>
					</q-card-section>

					<div
						v-if="Object.keys(productFilteredCategory).length === 0"
						class="text-center q-py-md text-bold text-red-5 text-h6"
					>
						Nenhum producto foi registado com esta categoria
					</div>

					<q-card-actions align="right">
						<q-btn flat label="OK" color="primary" v-close-popup />
					</q-card-actions>
				</q-card>
			</q-dialog>
		</q-card>
	</span>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import categoryDetails from './categoryDetails';

	export default {
		props: ['category', 'idCategory'],
		data() {
			return {
				dialog: false,
				colors: [
					'red-5',
					'deep-orange',
					'primary',
					'secondary',
					'pink',
					'teal',
					'light-green',
					'brown',
					'light-green-10',
					'blue-grey'
				]
			};
		},
		computed: {
			getColor() {
				return this.colors[
					Math.floor(Math.random() * this.colors.length)
				];
			},
			...mapState('product', ['productFilteredCategory'])
		},
		methods: {
			...mapActions('product', ['filterCategoryDatafromDb']),

			productFilterCategory(query) {
				this.filterCategoryDatafromDb(query);
				this.dialog = true;
			}
		},

		filters: {
			getNames(str) {
				var values = str.split(' ');
				var f_name = values.shift();
				var l_name = values.join(' ');

				let lastName = f_name + l_name;
				var values_ = lastName.split(' ');
				var f_name_ = values_.shift();
				var l_name_ = values_.join(' ');

				return (
					f_name.charAt(0).toUpperCase() +
					l_name.charAt(0).toUpperCase() +
					l_name_.charAt(0).toUpperCase()
				);
			}
		},
		components: {
			categoryDetails
		}
	};
</script>

<style>
	#btn :hover {
		transition: 0.5s;
		background: #4d91d0;
		color: white;
	}
</style>
