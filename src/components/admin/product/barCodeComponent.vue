<template>
	<q-dialog v-model="open">
        <q-card class="my-card">
            <q-card-actions vertical align="center">
                Clica no botão esquerdo do mouse sobre a figura abaixo, em seguida clica na opção <span class="text-bold text-italic">Salvar como imagem / save image as</span>
            </q-card-actions>
          				<VueBarcode :value="value" :options="{ displayValue: true }"  tag="img"></VueBarcode>

        </q-card>

	</q-dialog>
</template>

<script>
    import VueBarcode from '@xkeshi/vue-barcode';

	export default {
		name: 'productBodyComponent',
		props: ['value','open'],
		data() {
			return {
				role: null,
				
			};
		},
		computed: {
			
		},
		mounted() {
			// console.log(this.product)
		},
		methods: {
		
		},
		components: {
			
			VueBarcode 
		}
	};
</script>

<style scoped>
	.active-class {
		background: rgb(240, 240, 240);
	}
</style>
