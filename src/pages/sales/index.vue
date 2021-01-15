<template>
	<q-page class="q-py-md">
	
		<div class="q-pa-md row justify-center  ">
			<div class="col-6 ">
				<q-btn
					class=" q-pa-xs full-width text-body1"
					v-if="!getBoxStatus"
					icon="open_in_browser"
					@click="openBox"
					label="Abrir Caixa"
					push
					dark-percentage
					unelevated
					color="orange"


				/>
			</div>
		</div>

		<div class="row justify-center" v-if="$q.platform.is.desktop">
			<div class="col-6">
				<q-card flat class="">
					
						
						<div
							class="text-deep-purple text-bold text-center"
							v-if="getBoxStatus"
						>
							Dinheiro no Caixa : {{ myBoxCash }} , 00 MT
						</div>
					
					<div class="  row  q-pt-md ">
						<div class="col-12">
							<q-btn
								color="red-5"
								no-caps
								class=" q-pa-xs full-width text-body1"
								unelevated
								icon="close"
								v-if="getBoxStatus"
								label="Fechar Caixa"
								@click="closeBox()"
								push
								
							/>
						</div>
					</div>
					<openBoxComponent
						:open="open"
						@emitData="addBox"
						@closeDialog="open = false"
					/>
				</q-card>
			</div>

			<div class="row q-pa-md">
				<div class="col-12 q-pl-lg text-bold">
					{{
						Object.keys(getProductToAccept).length > 0
							? `Foram enviados produtos para ti, por favor aceite ou recuse!`
							: ``
					}}
				</div>

				<div class="" style="">
					<div class="row  justify-left q-pa-md q-ma-sm">
						<div
							class=" col-6  "
							v-for="(exported, index) in getProductToAccept"
							:key="index"
						>
							<productToAccept
								:exported="
									Object.assign({ id: index }, exported)
								"
								:id="index"
								@accept="accept"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div >
			

		

			<div
				class="text-center text-bold q-pt-xl text-grey-8 absolute-bottom"
			>
				<hr class="q-mb-sm" />
				<div
					class="row bg-primary text-white  absolute-bottom text-center justify-center q-pa-md "
				>
					Copyright ©2020 FSTOCK - N-FACILIDADES Sociedade Unipessoal
					Lda. Todos Direitos Reservados. faruquebraimo@gmail.com /
					846771216
				</div>
			</div>
		</div> -->

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
		</tamplate>
	</q-page>
</template>

<script>
	import { mapActions, mapState, mapGetters } from 'vuex';
	import openBoxComponent from '../../components/sales/openBoxComponent';
	import productToAccept from 'components/sales/productToAccept';
	import { date } from 'quasar';

	export default {
		data() {
			return {
				open: false,
				updateCategory: false,
				myBoxCash: 0,
				check1: true,
				check2: false,
				check3: false,

				notif1: true,
				notif2: true,
				notif3: false,

				volume: 6,
				brightness: 3,
				mic: 8
			};
		},
		components: {
			openBoxComponent,
			productToAccept
		},

		computed: {
			...mapState('box', ['boxs']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapGetters('setting', ['getLocalBoxStatus']),
			...mapState('expo', ['expoProducts', 'myProducts']),

			getProductToAccept() {
				let myProducts = {};
				Object.keys(this.myProducts).forEach(element => {
					let prod = this.myProducts[element];

					if (!prod.statusDelivery) {
						myProducts[element] = prod;
					}
				});

				return myProducts;
			},

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

			...mapActions('expo', ['updateExpoProduct', 'filterMyProducts']),

			accept(payload) {
				let product = {};
				let prod = {};

				prod = this.myProducts[payload];

				Object.keys(prod.product).forEach(element => {
					product[element] = prod.product[element];
					product[element].quantitySell =
						prod.product[element].newQtd;
					product[element].newQtd = 0;

					this.updateExpoProduct({
						id: payload,
						updates: {
							statusDelivery: true,
							product: product
						}
					});
				});

				this.filterMyProducts(this.getUserAuth.id);
			},

			openBox() {
				if (this.getLocalBoxStatus != null) {
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
									message: `Tem certeza que deseja fechar o caixa? 
										Isto irá  interromper as actividades do dia!
										`,
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
										updates: {
											status: false,
											closedAt: new Date()
										}
									});
									// this.$router.go()
								});
						}
					});
				}
			}
		},

		updated() {},
		updated() {},
		mounted() {
			this.filterMyProducts(this.getUserAuth.id);

			this.setPageTitle('N-Facilidades');
			const dateCreated = new Date();
			let date2 =
				this.getLocalBoxStatus != null
					? new Date(this.getLocalBoxStatus.data)
					: new Date();
			const unit = 'day';
			// date2 = date.addToDate(date2, { days: 7, month: 1 })
			const eguality = date.isSameDate(dateCreated, date2, unit);

			if (eguality == false) {
				localStorage.setItem('boxStatus', []);
				this.$router.go();
			} else {
			}
		},
		destroyed() {
			this.setPageTitle('');
		},
		updated() {}
	};
</script>

<style></style>
