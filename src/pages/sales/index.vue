<template>
	<q-page class="q-pa-md">
		<tamplate v-if="$q.platform.is.desktop">
			<q-card class="my-card text-bold text-center " square flat>
				<q-img
					src="/statics/welcome.png"
					basic
					style="height: 320px; max-width: 300px"
				>
				</q-img>
			</q-card>
			<div class=" text-subtitle2 text-center">
				Bem Vindo(a)
			</div>

			<div class="q-px-xl q-pa-md">
				<q-btn
					color="deep-purple"
					no-caps
					class="q-pa-sm  full-width text-body1"
					unelevated
					v-if="!getBoxStatus"
					icon="open_in_browser"
					@click="openBox()"
					label="Abrir Caixa"
				/>
				<div
					class="text-deep-purple text-bold text-center"
					v-if="getBoxStatus"
				>
					Dinheiro no Caixa : {{ myBoxCash }} , 00 MT
				</div>
			</div>

			<div class="q-px-xl">
				<q-btn
					color="red-5"
					no-caps
					class=" q-pa-sm full-width text-body1"
					unelevated
					icon="close"
					v-if="getBoxStatus"
					label="Fechar Caixa"
				/>
			</div>

			<div
				class="text-center text-bold q-pt-xl text-grey-8 absolute-bottom"
			>
				<hr class="q-mb-sm" />
				<p>Desenvolvido pela Gest Midia. Lda &copy; 2020</p>
			</div>
		</tamplate>

		<tamplate v-if="$q.platform.is.mobile">
			<q-card class="my-card text-bold text-center " square flat>
				<q-img src="/statics/welcome.png" basic> </q-img>
			</q-card>
			<div class=" text-subtitle2 text-center">
				Bem Vindo
			</div>

			<div class="q-pa-md">
				<q-btn
					color="deep-purple"
					no-caps
					class=" full-width"
					unelevated
					v-if="!getBoxStatus"
					icon="open_in_browser"
					label="Abrir Caixa"
					@click="openBox()"
				/>
				<div
					class="text-deep-purple text-bold text-center"
					v-if="getBoxStatus"
				>
					Dinheiro no Caixa : {{ myBoxCash }} , 00 MT
				</div>
			</div>

			<div class="q-px-md">
				<q-btn
					color="red-5"
					no-caps
					class=" full-width"
					unelevated
					v-if="getBoxStatus"
					icon="close"
					label="Fechar Caixa"
					@click="closeBox()"
				/>
			</div>

			<openBoxComponent
				:open="open"
				@emitData="addBox"
				@closeDialog="open = false"
			/>
			<div
				class="text-center text-bold q-pt-xl text-grey-8 absolute-bottom"
			>
				<hr class="q-mb-sm" />
				<p>Desenvolvido pela Gest Midia. Lda &copy; 2020</p>
			</div>
		</tamplate>
	</q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import openBoxComponent from '../../components/sales/openBoxComponent';
	import { date } from 'quasar';

	export default {
		data() {
			return {
				open: false,
				updateCategory: false,
				myBoxCash: 0
			};
		},
		components: {
			openBoxComponent
		},

		computed: {
			...mapState('box', ['boxs']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapGetters('setting', ['getLocalBoxStatus']),

			getBoxStatus() {
				let status = false;

				if (this.boxs) {
					Object.keys(this.boxs).forEach(element => {
						let box = this.boxs[element];

						if (
							box.createdBy.id === this.getUserAuth.id &&
							box.status
						) {
							status = true;
							this.myBoxCash = box.value;
						}
					});
				}

				return status;
			}
		},

		methods: {
			...mapActions('setting', [
				'setPageTitle',
				'addBoxStatus',
				'emptyBoxStatus'
			]),
			...mapActions('box', ['addBox', 'editBox']),

			openBox() {
				if ( this.getLocalBoxStatus != null ) {
					this.$q
						.dialog({
							title: 'Turno Fechado',
							message:
								'Não foi possivel abrir o turno,Volte a tentar amanhã'
						})
						.onOk(() => {});
				} else {
					this.open = true;
				}
			},

			closeBox() {
				if (this.boxs) {
					Object.keys(this.boxs).forEach(element => {
						let box = this.boxs[element];

						if (
							box.createdBy.id === this.getUserAuth.id &&
							box.status
						) {
							this.$q
								.dialog({
									title: 'Confirme',
									message:
										'Tem certeza que deseja fechar a caixa?',
									ok: 'Sim',
									cancel: true,
									cancel: 'Não',
									persistent: true
								})
								.onOk(() => {
									status = false;
									this.addBoxStatus();
									this.editBox({
										id: element,
										message: 'Caixa Fechada',
										updates: { status: false }
									});
									this.$router.go()
									
								}
								
								);
						}
					});
				}
			}
		},
		mounted() {
			this.setPageTitle('Ferragem A');
			const dateCreated = new Date();
			let date2 = this.getLocalBoxStatus  != null ?  new Date(this.getLocalBoxStatus.data) : new Date();
			const unit = 'day';
			// date2 = date.addToDate(date2, { days: 7, month: 1 })
				const eguality = date.isSameDate(
							dateCreated,
							date2,
							unit
						);
							console.log(eguality)

						if(eguality == false) {
						localStorage.setItem('boxStatus', [])
						this.$router.go()
						
						}
						else {
						}
					
					
		},
		destroyed() {
			this.setPageTitle('');
		},
		updated() {
		}
	};
</script>

<style></style>
