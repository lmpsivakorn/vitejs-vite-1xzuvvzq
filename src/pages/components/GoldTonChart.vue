<template>
	<VCard class="pa-4 pb-10 overflow-visible">
    <VCardTitle class="d-flex justify-space-between pa-4 px-6">
      <div>
				<div class="font-semibold text-xl text-slate-900 dark:text-white">
					Gold ETF
        </div>
			</div>
      <div>
        <VSelect
          v-model="monthIndex"
          :items="data"
          variant="outlined"
          :item-title="item => monthName(item.id)"
          :item-value="item => data.indexOf(item)"
          width="240"
          class="ml-auto0"
        />
      </div>
    </VCardTitle>

		<div
			v-if="loading"
			class="flex flex-col justify-center items-center"
      style="height: 420px;"
		>
			<div class="spinner text-base"></div>
		</div>
		<div
			v-else
			class="legend-ring4"
		>
			<VueApexCharts
				type="area"
				height="420"
				:options="chartOptions"
				:series="info[monthIndex]"
			/>
		</div>
	</VCard>
</template>

<script>
import {mapState} from "pinia";
import {InfoStore} from "@/store/info";
import {useConfigStore} from '@core/stores/config';

const configStore = useConfigStore();

const decimalFormat = new Intl.NumberFormat('th-TH', { style: 'decimal', minimumFractionDigits: 3, maximumFractionDigits: 3 })

export default {
  data() {
    return {
			loading: false,
			monthIndex: 0,
    };
  },

  computed: {
		...mapState(InfoStore, {data: 'goldTonInfo'}),
		...mapState(InfoStore, {eftData: 'goldTonEtfInfo'}),
		
		info () {
			return [this.eftData.currentMonth, this.eftData.lastMonth]
		},
		
		selectedMonth() {
			if (!this.data || this.data.length === 0) {
				return new Date().toISOString().slice(0, 7); // Default to current month if no data
			}
			
			return this.data[this.monthIndex].id;
		},

		chartOptions() {
			return {
				chart: {
					toolbar: {
						show: false,
					},
					offsetX: 0,
					offsetY: 0,
					zoom: {
						enabled: false,
					},
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					show: true,
					curve: "smooth",
					width: 2,
				},
				colors: [
					'#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF',
					'#FF33FF', '#336699', '#993366', '#669933', '#339966',
					'#996633', '#663399', '#A9A9A9', '#D3D3D3', '#800000',
					'#008000', '#000080', '#808000', '#800080', '#008080',
					'#C0C0C0', '#8B4513', '#2F4F4F', '#4682B4', '#708090',
					'#B22222', 
				],
				tooltip: {
          // followCursor: true,
          theme: 'dark',
				},
				legend: {
					offsetY: 6,
					show: true,
					horizontalAlign: "center", // "left",
					fontSize: "8px",
					fontFamily: "Inter",
					labels: {
						colors: configStore.theme.isDark ? "#CBD5E1" : "#475569",
					},
					markers: {
						width: 6,
						height: 6,
						offsetY: 0,
						offsetX: -5,
						radius: 12,
					},
					itemMargin: {
						horizontal: 18,
						vertical: 8,
					},
				},
				grid: {
					show: true,
					borderColor: configStore.theme.isDark ? "#334155" : "#E2E8F0",
					strokeDashArray: 10,
					position: "back",
				},
				fill: {
					type: "gradient",
					gradient: {
						shadeIntensity: 0.3,
						opacityFrom: 0.4,
						opacityTo: 0.5,
						stops: configStore.theme.isDark ? [0, 30, 0] : [0, 100, 0],
					},
				},
				yaxis: {
					// stepSize: 100,
					labels: {
						style: {
							colors: "#CBD5E1",
							// fontFamily: "Inter",
						},
						formatter: (val) => {
							return val ? this.floatFormat(val) : undefined;
						}
					},
				},
				xaxis: {
					type: "datetime",
					categories: new Array(this.daysOfMonth(this.selectedMonth))
						.fill(0)
						.map((_, i) => this.selectedMonth + "-" + (i + 1).toString().padStart(2, '0')),
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					labels: {
						style: {
							colors: "#CBD5E1",
							fontFamily: "Inter",
						},
					},
				},
			};
		},
	},

  mounted () {
    InfoStore().getGoldTon()
			.then(() => {
				this.loading = false;
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
  },

	methods: {
		floatFormat (v) {
      return decimalFormat.format(v);
    },

    daysOfMonth (month) {
      const date = month ? new Date(month) : new Date();
      date.setMonth(date.getMonth() + 1, 0); // Set to the last day of the month

      return date.getDate();
    },

		monthName (dt) {
			const date = new Date(dt);
			const options = { month: 'long'};

			return date.toLocaleDateString('en-US', options);
		},
	},

	unmounted () {
		InfoStore().setActive('goldTonInfo', 'remove');
	},
};
</script>

<style></style>
