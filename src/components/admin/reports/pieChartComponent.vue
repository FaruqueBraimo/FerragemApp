<template>
	<div class=" ">
		<GChart
			type="PieChart"
			:data="chartData"
			:options="chartOptions"
			:settings="{ packages: ['corechart', 'table', 'map'] }"
			resizeDebounce="500"
		/>
	</div>
</template>

<script>
	import { GChart } from 'vue-google-charts';

	export default {
		components: {
			GChart
		},
		data() {
			return {
				// Array will be automatically processed with visualization.arrayToDataTable function
				chartData: [
					['Produtos', 'Quantidade'],
					['Juntas', 11],
					['Vela de inglinação', 2],
					['Filto de combustivel', 2],
					['Apoios de Motor V', 2],
					['Discos de Travão', 7]
				],
				chartOptions: {
					width: 500,

					chart: {
          title: 'My Daily Activities',
					},
					series: {
						0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
						1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
					}
				}
			};
		}
	};
</script>

<style scoped></style>
