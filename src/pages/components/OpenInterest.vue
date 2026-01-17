<template>
	<VCard class="pa-4 pb-2">
		<div v-if="loadingCmegroup" class="flex flex-col justify-center items-center h-[420px]">
			<div class="spinner text-base"></div>
		</div>
		<div v-else class="legend-ring">
			<VueApexCharts
				type="bar"
				height="420"
				:options="chartOptions"
				:series="chartInfo"
			/>
		</div>
	</VCard>
</template>

<script>
import {mapState} from "pinia";
import {InfoStore} from "@/store/info";
import {useConfigStore} from '@core/stores/config';

import convertModule from "@/modules/convert.js";

const infoStore = InfoStore();
const configStore = useConfigStore();

export default {
	components: {
    
  },
  data: () => ({
    loadingCmegroup: true,
  }),
  computed: {
		...mapState(InfoStore, {data: 'openInterestInfo'}),

    categories() {
      if (! this.data.categories || this.data.categories.length === 0) {
        return [];
      }

      if (this.data.categories.length <= 7) {
        return this.data.categories;
      }

      const midIndex = Math.floor(this.data.categories.length / 2);
      const distance = Math.floor(midIndex / 4);
      
      let categories = [];
      for (let i = 0; i < this.data.categories.length; i++) {
        categories.push('');
      }

      categories[0] = this.data.categories[0];
      categories[distance * 1] = this.data.categories[distance * 1];
      categories[distance * 2] = this.data.categories[distance * 2];
      categories[distance * 3] = this.data.categories[distance * 3];
      categories[distance * 4] = this.data.categories[distance * 4];
      categories[distance * 5] = this.data.categories[distance * 5];
      categories[distance * 6] = this.data.categories[distance * 6];
      categories[distance * 7] = this.data.categories[distance * 7];

      categories[this.data.categories.length - 1] = this.data.categories[this.data.categories.length - 1];

      return categories;
    },

    chartInfo () {
      return [
        {
          name: "Call",
          data: this.data.data_call || [],
        },
        {
          name: "Put",
          data: this.data.data_put || [],
        },
      ];
    },

		chartOptions () {
      const categories = this.data.categories;
      return {
        chart: {
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "100%",
          },
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "right",
          fontSize: "12px",
          fontFamily: "Inter",
          offsetY: -30,
          markers: {
            width: 8,
            height: 8,
            offsetY: -1,
            offsetX: -5,
            radius: 12,
          },
          labels: {
            colors: configStore.theme === 'dark' ? "#CBD5E1" : "#475569",
          },
          itemMargin: {
            horizontal: 18,
            vertical: 0,
          },
        },
        subtitle: {
          text: `Updated at : ${convertModule.toLocaleString(infoStore?.snapshotData?.openInterestInfo)}`,
          margin: 30,
          style: {
            color: '#999999'
          },
        },
        title: {
          text: 'Open Interest',
          align: "left",

          offsetX: configStore.isAppRTL ? "0%" : 0,
          offsetY: 13,
          floating: false,
          style: {
            fontSize: "20px",
            fontWeight: "500",
            fontFamily: "Inter",
            color: configStore.theme === 'dark' ? "#fff" : "#0f172a",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        yaxis: {
          opposite: configStore.isAppRTL ? true : false,
          labels: {
            style: {
              colors: configStore.theme === 'dark' ? "#CBD5E1" : "#475569",
              fontFamily: "Inter",
            },
          },
        },
        xaxis: {
          categories: this.categories,
          labels: {
            style: {
              colors: configStore.theme === 'dark' ? "#CBD5E1" : "#475569",
              fontFamily: "Inter",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          intersect: false,
          shared: true,
          followCursor: true,
          theme: 'dark',
          x: {
            formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
              return categories[dataPointIndex];
            }
          },
        },
        colors: ["#5FF5B1", "#F1595C"],
        grid: {
          show: true,
          borderColor: configStore.theme === 'dark' ? "#334155" : "#E2E8F0",
          strokeDashArray: 10,
          position: "back",
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              legend: {
                position: "bottom",
                offsetY: 8,
                horizontalAlign: "center",
              },
              plotOptions: {
                bar: {
                  columnWidth: "80%",
                },
              },
            },
          },
        ],
      };
		},
	},

  mounted () {
    infoStore.getOpenInterest().then(() => {
      this.loadingCmegroup = false;
    }).catch((error) => {
      console.error("Error fetching openInterest:", error);
    });
  },

  unmounted() {
    infoStore.setActive('openInterestInfo', 'remove');
  },
};
</script>

<style></style>
