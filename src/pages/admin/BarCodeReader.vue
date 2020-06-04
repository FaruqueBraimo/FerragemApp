<template>
	<q-page :style-fn="myTweak" padding>
		<div class="row justify-center items-center ">
			<ImageBarcodeReader @decode="onDecode"></ImageBarcodeReader>
		</div>
	</q-page>
</template>

<script>
	import { ImageBarcodeReader } from 'vue-barcode-reader';
	import { mapActions, mapState } from 'vuex';

	export default {
		components: { ImageBarcodeReader },
		computed: {
			...mapState('product', ['products'])
		},

		methods: {
			readBarCode() {},
			onDecode(result) {
                let product = this.products[result]
				this.$q.dialog({
					title: product.name,
					message: `Preco ${product .price} MZN , quantidade no stock ${product.quantity} `
				});
			}
		}
	};
</script>

<style></style>
