<template>
	<div class=" ">
		<GChart
			type="ColumnChart"
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
					['Ano', 'Saida', 'Entrada', 'Vendas'],
					['2016', 1000, 400, 200],

					['2017', 100, 400, 200],
					['2018', 1170, 460, 250],
					['2019', 1500, 1120, 300],
					['2020', 1030, 540, 350]
				],
				chartOptions: {
                    width: 600,

					chart: {
						title: 'Company Performance',
						subtitle: 'Entradas, Expenses, and Profit: 2014-2017'
                    },
                      series: {
            0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
            1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
          },
				}
			};
		}
	};
</script>

<style scoped></style>
