<template>
	<VCard class="pa-4 pb-10">
		<VCardTitle class="d-flex justify-space-between pa-4 px-6">
      <div>
				<div class="font-semibold text-xl">
					COT Report: GOLD ({{ latestDate }})
        </div>
			</div>
    </VCardTitle>

		<!-- <div class="grid md:grid-cols-2 grid-cols-1 gap-5"> -->
    <v-row class="pa-4 pb-0">
      <v-col cols="12" md="6">
        <div
          class="rounded pa-4"
          :class="{'bg-blue-grey-darken-4': isDarkMode, 'bg-grey-lighten-1': !isDarkMode}"
        >
          <div class="text-sm font-weight-black mb-2">
            Long Change
          </div>
          <div
            class="text-lg font-medium mb-2"
            :style="{ color: (data[latestDate]?.lc || 0) > 0 ? '#5FF5B1' : (data[latestDate]?.lc || 0) < 0 ? '#F1595C' : (isDarkMode ? '#CBD5E1' : '#475569') }"
          >
            {{ intFormat(data[latestDate]?.lc || 0) }}
          </div>
          <div class="text-sm">
            <span class="text-primary">{{ floatFormat(longChangePercent || 0) }}%</span>
            From last Week
          </div>
          <div class="mt-4">
            <VueApexCharts
              type="line"
              height="44"
              :options="changeChartOptions"
              :series="[{name: 'Long', data: last7DaysInfo.map(item => item.l || 0)}]"
            />
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div
          class="rounded pa-4"
          :class="{'bg-blue-grey-darken-4': isDarkMode, 'bg-grey-lighten-1': !isDarkMode}"
        >
          <div class="text-sm font-weight-black mb-2">
            Short Change
          </div>
          <div
            class="text-lg font-medium mb-2"
            :style="{ color: (data[latestDate]?.sc || 0) > 0 ? '#5FF5B1' : (data[latestDate]?.sc || 0) < 0 ? '#F1595C' : (isDarkMode ? '#CBD5E1' : '#475569') }"
          >
            {{ intFormat(data[latestDate]?.sc || 0) }}
          </div>
          <div class="text-sm">
            <span class="text-primary">{{ floatFormat(shortChangePercent || 0) }}%</span>
            From last Week
          </div>
          <div class="mt-4">
            <VueApexCharts
              type="line"
              height="44"
              :options="changeChartOptions"
              :series="[{name: 'Short', data: last7DaysInfo.map(item => item.s || 0)}]"
            />
          </div>
        </div>
      </v-col>
      <v-col>
        <div
          class="rounded pa-4"
          :class="{'bg-blue-grey-darken-4': isDarkMode, 'bg-grey-lighten-1': !isDarkMode}"
        >
          <div class="d-flex items-center">
            <div class="flex-none">
              <div class="text-h5 font-weight-black mt-3 mb-2">
                Managed Money
                <div class="text-sm mt-n1">
                  Long vs. Short
                </div>							
              </div>
              <div class="text-h5 font-weight-black mb-2">
                Long
                <div class="text-sm mt-n1">
                  {{ intFormat(longShortInfo[0] || 0) }}
                </div>
              </div>
              <div class="text-h5 font-weight-black">
                Short
                <div class="text-sm mt-n1">
                  {{ intFormat(longShortInfo[1] || 0) }}
                </div>
              </div>
            </div>
            <div class="flex-1">
              <div class="legend-ring2">
                <VueApexCharts
                  type="donut"
                  height="220"
                  :options="longShortChartOptions"
                  :series="longShortInfo"
                />
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
		<!-- </div> -->
	</VCard>
</template>

<script>
import {mapState} from "pinia";
import {InfoStore} from "@/store/info";
import {useConfigStore} from '@core/stores/config';

const configStore = useConfigStore();

const decimalFormat = new Intl.NumberFormat('th-TH', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const integerFormat = new Intl.NumberFormat('th-TH', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 })

export default {

  data() {
    return {
      sortedKeys: [],
    };
  },

  computed: {
		...mapState(InfoStore, {data: 'goldTradingsterInfo'}),

    isDarkMode () {
      return configStore.theme === 'dark';
    },

		latestDate () {
			this.sortedKeys = Object.keys(this.data).sort((a, b) => new Date(b) - new Date(a));
			
			return this.sortedKeys.length > 0 ? this.sortedKeys[0] : null;
			// return Object.keys(this.data).reduce((a, b) => a > b ? a : b, null);
		},
		last7DaysInfo () {
			return new Array(7).fill(null).map((_, i) => {
				return this.data[this.sortedKeys[i]] || { l: 0, s: 0, lc: 0, sc: 0 };
			}).reverse();
		},
		
    longShortInfo () {
			const maxKey = this.latestDate
			if (!maxKey) {
				return [0, 0];
			}

      return [
				this.data[maxKey]?.l || 0,
				this.data[maxKey]?.s || 0,
			];
    },

		longChangePercent () {
			const maxKey = this.latestDate;
			if (!maxKey) {
				return 0;
			}

			return (this.data[maxKey]?.lc / (this.data[maxKey]?.l - this.data[maxKey]?.lc)) * 100;
		},
		shortChangePercent () {
			const maxKey = this.latestDate;
			if (!maxKey) {
				return 0;
			}

			return (this.data[maxKey]?.sc / (this.data[maxKey]?.s - this.data[maxKey]?.sc)) * 100;
		},

		changeChartOptions () {
			return {
				chart: {
					toolbar: {
						show: false,
					},
					offsetX: 0,
					offsetY: 0,

					sparkline: {
						enabled: true,
					},
				},
				stroke: {
					width: [2],
					curve: "straight",
					dashArray: [0, 8, 5],
				},
				dataLabels: {
					enabled: false,
				},

				markers: {
					size: 4,
					colors: this.isDarkMode ? "#4669FA" : "#fff",
					strokeColors: "#4669FA",
					strokeWidth: 2,
					shape: "circle",
					radius: 2,
					hover: {
						sizeOffset: 1,
					},
				},

				yaxis: {
					show: false,
				},
				xaxis: {
					show: false,
					labels: {
						show: false,
					},
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					categories: this.sortedKeys.slice(0, 7).reverse(),
				},
				grid: {
					show: true,
					borderColor: this.isDarkMode ? "#334155" : "#E2E8F0",
					strokeDashArray: 5,
					position: "back",
					xaxis: {
						lines: {
							show: true,
						},
					},
					yaxis: {
						lines: {
							show: false,
						},
					},
				},
				colors: ["#4669FA"],
        tooltip: {
          theme: 'dark',
        }
			};
		},

		longShortChartOptions() {
			return {
				labels: ["Long", "Short"],
				dataLabels: {
					enabled: false,
				},
				colors: ["#5FF5B1", "#F1595C"],
				legend: {
					position: "bottom",
					fontSize: "14px",
					fontFamily: "Inter",
					fontWeight: 400,
					markers: {
						width: 8,
						height: 8,
						offsetY: 0,
						offsetX: -5,
						radius: 12,
					},
					itemMargin: {
						horizontal: 18,
						vertical: 0,
					},
					labels: {
						colors: this.isDarkMode ? "#CBD5E1" : "#475569",
					},
				},
				plotOptions: {
					pie: {
						donut: {
							size: "65%",
						},
					},
				},
				responsive: [
					{
						breakpoint: 480,
						options: {
							legend: {
								position: "bottom",
							},
						},
					},
				],
			};
		},
	},

  mounted () {
    InfoStore().getGoldTradingster().catch((error) => {
      console.error("Error fetching data:", error);
    });
  },

	methods: {
    floatFormat (v) {
      return decimalFormat.format(v);
    },
    intFormat (v) {
      return integerFormat.format(v);
    },
	},

	unmounted() {
		InfoStore().setActive('goldTradingsterInfo', 'remove');
	},
};
</script>

<style></style>
