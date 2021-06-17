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
<q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Montante a tirar</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="amount" type="number" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

		  <q-card-section>
          <div class="text-h6">Descreva o porquê da retira</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="description"  type="textarea" autofocus @keyup.enter="prompt = false" />
        </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Finalizar" v-close-popup @click="subtraiValue()" />
        </q-card-actions>
      </q-card>
    </q-dialog>


	<q-dialog v-model="prompt2" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Montante a adicionar</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="amount" type="number" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

		  <q-card-section>
          <div class="text-h6">Descreva o porquê da Adição</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="description"  type="textarea" autofocus @keyup.enter="prompt = false" />
        </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Finalizar" v-close-popup @click="addValue()" />
        </q-card-actions>
      </q-card>
    </q-dialog>


<q-card class="my-card q-mx-xl " square 	v-if="getBoxStatus">
	<q-card-section >
		<div id="printMe" >
			
			<div class="row q-pa-sm text-bold ">
				<div class="col text-h6 text-bold text-center">
					Caixa 
				</div>
				

			</div>

			<div class="row q-pa-sm text-indigo ">
				<div class="col">Dinheiro :</div>
				<div class="col text-right text-bold q-pr-md">
					{{
						MyBox.box.value
					}}, 00MT
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Hora de abertura:</div>
				<div class="col text-right q-pr-md">
					{{ MyBox.box.createdAt  | dateFormat  }}
				</div>
			</div>

			<div class="row q-pa-sm ">
				<div class="col">Vendedor:</div>
				<div class="col text-right q-pr-md">
					{{ MyBox.box.createdBy.name || ''   }}
				</div>
			</div>

			<hr class="text-center q-ma-sm" />

			<div class="row q-pa-sm ">
				<div class="col text-bold">Estado :</div>
				<div v-if="MyBox.box.status" class="col text-right text-green q-pr-md">
					Aberto
				</div>
				<div v-else class="col text-right text-red q-pr-md">
					Fechado
				</div>
			</div>
		</div>
		</div>
		<div class="q-pt-md   " >
			<q-btn
				
				class=" full-width"
				unelevated
					v-if="MyBox.box.status"
				label="Fechar"
	@click="closeBox()"
	push
				
						color="dark"
						icon="close"
			
			/>

			<div class="row"> 
					<div class="col q-px-md">
							<q-btn
				
				class=" full-width q-my-sm"
				unelevated
					v-if="MyBox.box.status"
				label="Adicionar dinheiro"
			@click="prompt2 = true" 
				
							
						color="primary"
			
			/>
					</div>
					<div class="col q-px-md">
							<q-btn
				
				class=" full-width q-my-sm"
				unelevated
					v-if="MyBox.box.status"
				label="Retirar dinheiro"
		    	@click="prompt = true" 
				
							
						color="red-5"
			
			/>
					</div>
			</div>

		
		</div>
		</div>
	</q-card-section>
	
	
</q-card>	







		<div class="row justify-center" v-if="$q.platform.is.desktop">
			<div class="col-6">

				<q-card flat class="">
				
					<openBoxComponent
						:open="open"
						@emitData="addBox"
						@closeDialog="open = false"
					/>
				</q-card>
			</div>

			
		</div>

	
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
				MyBox: {},
				count: 0,
				  prompt: false,
				  prompt2: false,
				  amount : '',
				  description : ""


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
					Object.keys(this.boxs).forEach((element, index) => {
						let box = this.boxs[element];

						if (
							box.createdBy.id === this.getUserAuth.id &&
							box.status
						) {
							status = true;

							this.MyBox = Object.assign({id : element, box :box });
						}
					});
				}

				return status;
			}
		},

		methods: {
						...mapActions('retirada' , ['addRetirada']),

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

				Object.keys(prod  ).forEach(element => {
					product[element] = prod [element];
					product[element].quantitySell =
					 prod[element].newQtd;
					

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
			// if (this.getLocalBoxStatus != null) {
			// 		this.$q
			// 			.dialog({
			// 				title: 'Turno Fechado',
			// 				message:
			// 					'Não foi possivel abrir o turno,Volte a tentar amanhã'
			// 			})
			// 			.onOk(() => {});
			// 	} else {
				
			// 	}

					this.open = true;
			},

			subtraiValue() {
				const box = this.MyBox

				if( box.box.value >= this.amount ) {
this.editBox({
										id: box.id,
										message: 'Montante Retirado',
										updates: {
										
											value : box.box.value - this.amount,
											closedAt: new Date()
										}
									});

						this.addRetirada({ amount : this.amount, justification : this.description, by : this.getUserAuth.id  })
						this.amount = ""
						this.description = 	""

				}
				else{
					this.$q.dialog({
					title: 'Sem dinheiro suficiente',
					message: 'O montante intoduzido é superior ao dinheiro da caixa'
				})
				}
				


			},

		
			
			addValue() {
				const box = this.MyBox

this.editBox({
										id: box.id,
										message: 'Montante Adicionado',
										updates: {
										
											value : ~~box.box.value + ~~this.amount,
											closedAt: new Date()
										}
									});

						this.addRetirada({ amount : this.amount, justification : this.description, by : this.getUserAuth.id , status  : "Adicao" })
						this.amount = ""
						this.description = 	""	
			


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
									message: `Tem certeza que deseja fechar o caixa?`,
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
			this.filterMyProducts(this.getUserAuth.id);
			this.setPageTitle('N-Facilidades');
		
		},
		filters: {
			dateFormat(val) {
				if (val ) {

				
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
					dateCreated.getHours() +
					'h' + ':' +
					dateCreated.getMinutes()
					
				);
			}
		}},
		
		destroyed() {
			this.setPageTitle('');
		},
	};
</script>

<style></style>
