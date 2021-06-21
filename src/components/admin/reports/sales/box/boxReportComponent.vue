<template>
	<q-dialog
		v-model="toggleDialog"
		:maximized="maximizedToggle"
		transition-show="slide-up"
		transition-hide="slide-down"
	>
		<q-card>
			{{ prod }}
			<q-card-section class="row items-center">
				<div class="text-h6 text-left col">
					Relatorios de Fluxo de Caixa
				</div>
				<div class="text-h6 text-cyan-10 col text-center">
					Somatorio de Dinheiro : {{ totalMoney || 0 }}, 00 MT
				</div>
				<q-space />
				<q-btn
					icon="close"
					flat
					round
					dense
					@click="$emit('closeDialog')"
				/>
			</q-card-section>
			<q-card-section>
				<q-markup-table
					flat
					bordered
					square
					class="q-pa-md"
					style="width: 100%"
				>
					<box-header-component
						class="q-pa-sm"
						@openHistory="changeHistory"
						:openHistory="openHistory"
					/>

					<tbody v-if="openHistory">
						<box-history-component
							v-for="(box, index, count) in getHistoryBox"
							:key="index"
							:box="Object.assign({ id: index }, box)"
							:boxId="index"
							@closeBox="closeBox"
							:count="count"
							@deleteProduct="removeBox"
						/>
					</tbody>
				</q-markup-table>

				<div class="row justify-left">
					<div
						class="col-4 q-pa-md"
						v-for="(box, index, count) in getBox"
						:key="index"
					>
						<box-body-component
							v-if="!openHistory"
							:box="Object.assign({ id: index }, box)"
							:boxId="index"
							@closeBox="closeBox"
							:count="count"
						/>
					</div>

					<q-card
						flat
						class="my-card q-pa-lg fixed-center q-ma-lg"
						v-if="Object.keys(getBox).length == 0 && !openHistory"
					>
						<q-card-actions vertical align="center">
							<div class="text-green text-bold text-h6">
								Nenhum caixa aberto no dia de hoje
							</div>
						</q-card-actions>
					</q-card>
				</div>
			</q-card-section>

			<download-excel
				v-if="openHistory"
				class="q-px-md"
				:data="json_data"
				:fields="json_fields"
				worksheet="Historico de caixa"
				name="Historico_Caixa.xls"
			>
				<q-btn
					color="green-7"
					icon="save_alt"
					label="Excel"
					unelevated
				/>
			</download-excel>
		</q-card>
	</q-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import boxBodyComponent from './boxBodyComponent';
import boxHistoryComponent from './history/boxHistoryComponent';

import boxHeaderComponent from './boxHeaderComponent';
import { date } from 'quasar';
import Vue from 'vue';
import JsonExcel from 'vue-json-excel';

Vue.component('downloadExcel', JsonExcel);

export default {
	name: 'boxsReportComponent',
	props: ['showBox'],

	data() {
		return {
			maximizedToggle: true,
			search: '',
			totalMoney: 0,
			options: [],
			openHistory: false,
			json_fields: {
				Data: 'Data',
				HoraAbertura: 'HoraAbertura',
				HoraFechada: 'HoraFechada',
				Montante_Final: 'inicialValue',
				Montante_Inicial: 'finalValue',
				Balconista: 'createdBy'
			},
			json_data: [],
			json_meta: [
				[
					{
						key: 'charset',
						value: 'utf-8'
					}
				]
			]
		};
	},
	computed: {
		...mapState('box', ['boxs', 'boxFiltered']),
		...mapGetters('box', ['filterSaleByTime']),

		prod() {
			let box = {};
			let boxToJson = {};
			let count = 0;
			Object.keys(this.getHistoryBox).map((element, index) => {
					count = index;
				boxToJson = this.getHistoryBox[element];
				this.json_data[count] = {
					Data: this.convertToDate(boxToJson.createdAt),
					HoraAbertura: this.timeFormat(boxToJson.createdAt),
					HoraFechada: this.timeFormat(boxToJson.closedAt),
					inicialValue: boxToJson.beginValue,
					finalValue: boxToJson.value,
					createdBy: boxToJson.createdBy.name
				};
			});

			return '';
		},

		getHistoryBox() {
			let boxs = {};
			if (Object.keys(this.boxs).length > 0) {
				const dateCreated = new Date();
				const unit = 'day';
				Object.keys(this.boxs).forEach((element, key) => {
					let box = this.boxs[element];
					let date2 = new Date(box.createdAt.seconds * 1000);

					boxs[element] = box;
				});
			}
			return boxs;
		},

		getBox() {
			let boxs = {};

			const dateCreated = new Date();
			const unit = 'day';

			if (Object.keys(this.boxs).length > 0) {
				Object.keys(this.boxs).forEach((element, key) => {
					let box = this.boxs[element];
					let date2 = new Date(box.createdAt.seconds * 1000);

					const equality = date.isSameDate(dateCreated, date2, unit);
					if (equality) {
						boxs[element] = box;
						this.totalMoney = this.totalMoney + ~~box.value;
					}
				});
			}
			return boxs;
		},

		toggleDialog: {
			get() {
				return this.showBox;
			},
			set(val) {
				this.$emit('closeDialog');
			}
		},

		getFilterdValueByTime(value) {
			console.log(value);
		}
	},
	mounted() {},

	methods: {
		...mapActions('box', ['deleteBox', 'setSalesearchKey', 'editBox']),

		timeFormat(val) {
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
			let dateCreated = new Date(val * 1000);
			return (
				dateCreated.getHours() + 'h' + ':' + dateCreated.getMinutes()
			);
		},

		convertToDate(val) {
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
		},

		removeBox(id) {
			this.$q
				.dialog({
					title: 'Confirme',
					message: `Tem certeza que deseja apagar este fluxo ?`,
					ok: 'Sim',
					cancel: true,
					cancel: 'Não',
					persistent: true
				})
				.onOk(() => {
					this.deleteBox(id);
				});
		},
		changeHistory() {
			this.openHistory = !this.openHistory;
		},

		closeBox(id) {
			this.$q
				.dialog({
					title: 'Confirme',
					message: `Tem certeza que deseja fechar o caixa?
								Isto irá  interromper as actividades do dia!

						`,
					ok: 'Sim',
					cancel: true,
					cancel: 'Não',
					persistent: true
				})
				.onOk(() => {
					this.editBox({
						id: id,
						message: 'Caixa Fechada',
						updates: { status: false }
					});
				});
		},
		closeDialog() {
			this.dialog = false;
			this.updateCategory = false;
		},
		filterbox(query) {
			this.filterDatafromDb(query);
		},
		boxFilterCategory(query) {
			this.filterCategoryDatafromDb(query);
		}
	},
	components: {
		boxHeaderComponent,
		boxBodyComponent,
		boxHistoryComponent
	},

	watch: {
		search(val) {}
	}
};
</script>
