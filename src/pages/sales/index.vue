<template>
	<q-page class="q-pa-md">
		<div class=" q-pa-md text-primary text-subtitle2 text-center">
			Bem Vindo(a)
		</div>

		<div class="row" v-if="$q.platform.is.desktop">
			<div class="col-6 q-pa-md">
				<q-card bordered flat class="q-pa-md">
					<div class=" ">
						<q-btn
							color="deep-purple"
							no-caps
							class="q-pa-sm   text-body1"
							unelevated
							v-if="!getBoxStatus"
							icon="open_in_browser"
							@click="openBox"
							label="Abrir Caixa"
						/>
						<div
							class="text-deep-purple text-bold text-center"
							v-if="getBoxStatus"
						>
							Dinheiro no Caixa : {{ myBoxCash }} , 00 MT
						</div>
					</div>

					<div class="row q-px-xl q-pt-md ">
						<q-btn
							color="red-5"
							no-caps
							class=" q-pa-xs full-width text-body1"
							unelevated
							icon="close"
							v-if="getBoxStatus"
							label="Fechar Caixa"
						/>
					</div>
					<openBoxComponent
						:open="open"
						@emitData="addBox"
						@closeDialog="open = false"
					/>
				</q-card>
			</div>

			<div class="col q-pa-md">
 <div class="" style="">
    <q-list bordered padding >
           
      <q-item-label header class="text-bold text-blue-grey-9"> Tem Produtos por aceitar, exportados pelo Admistrador </q-item-label>

      <q-item tag="label" v-ripple  v-for="(product, index) in (myProducts) " 	:key="index">
		  
        <q-item-section v-if="product.statusDelivery == false">
          <q-item-label>   {{product.quantity  }} quantidades de  {{product.product.label  }} </q-item-label>
        </q-item-section>
        <q-item-section side   v-if="product.statusDelivery == false" >
			<q-btn color="primary" icon="check" size="sm" label="Aceitar" unelevated />
        </q-item-section>
      </q-item>

   
     
    </q-list>
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
			openBoxComponent
		},

		computed: {
			...mapState('box', ['boxs']),
			...mapGetters('auth', ['getUserName', 'getUserAuth']),
			...mapGetters('setting', ['getLocalBoxStatus']),
	        ...mapState('expo', ['expoProducts', 'myProducts']),


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
		mounted() {
			this.setPageTitle('Ferragem A');
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
