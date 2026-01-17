<template>
  <VCard class="pa-4 pb-2">
    <VCardTitle v-if="!loadingCmegroup">
      <VSelect
        v-model="chart.selected"
        :items="chart.data"
        item-title="name"
        item-value="slot"
        variant="outlined"
        width="240"
        class="ml-auto"
        return-object
        @update:modelValue="item => chart.selected = item"
      />
    </VCardTitle>

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

// import Card from "@/components/Card";
// import Dropdown from "@/components/Dropdown";
// import {MenuItem} from "@headlessui/vue";

import convertModule from "@/modules/convert.js";

const infoStore = InfoStore();
const configStore = useConfigStore();

export default {
	components: {
    // Card,
    // Dropdown,
    // MenuItem,
  },

  data: () => ({
    chart: {
      data: [],
      selected: {},
    },
    loadingCmegroup: true,
    mapMonths: {
      "F": "January",
      "G": "February",
      "H": "March",
      "J": "April",
      "K": "May",
      "M": "June",
      "N": "July",
      "Q": "August",
      "U": "September",
      "V": "October",
      "X": "November",
      "Z": "December",
    },
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
      if (!this.data.data) {
        return [
          {
            name: "Call",
            data: [],
          },
          {
            name: "Put",
            data: [],
          },
        ];
      }

      const dataPut = [];
      const dataCall = [];
      const data = this.data.data;
      Object.keys(data).forEach(key => {
        const value = data[key].split(",");
        dataCall.push(value[this.chart.selected.slot] || 0);
        dataPut.push(value[this.chart.selected.slot + 1] || 0);
      });
      
      return [
        {
          name: "Call",
          data: dataCall,
        },
        {
          name: "Put",
          data: dataPut,
        },
      ];
    },

		chartOptions () {
      if (!this.data.header) {
        return {};
      }

      const categories = this.data.categories;
      const dataHeader0 = this.data.header[0].split(",")[this.chart.selected.slot + 1].split("|");
      const dataHeader1 = this.data.header[1].split(",")[this.chart.selected.slot + 1].split("|");

      const removeGCDataHeader01 = dataHeader0[1].replace("GC", "").match(/^([A-Za-z]+)(\d+)$/);

      const removeOGDataHeader11 = dataHeader1[1].replace("OG", "").match(/^(\d*)([A-Za-z]+)(\d+)$/);
      // console.log(dataHeader1);

      const week = removeOGDataHeader11?.[1] || null;

      // GCQ5 (August 2025) – $3,383.00/oz
      const title = `
        ${dataHeader0[1]}
        (${this.mapMonths[removeGCDataHeader01[1]]} 202${removeGCDataHeader01[2]})
        –
        $${convertModule.toNumberCommaDecimal(dataHeader0[2])}/oz
      `;

      // Gold Jul '25 W3 – 4 day left (Updated at : 7/14/2025, 5:29:04 PM)
      // console.log(this.mapMonths, removeOGDataHeader11);
      const subtitle = !removeOGDataHeader11 ? '-' : `
        Gold
        ${this.mapMonths[removeOGDataHeader11[2]].substring(0,3).toUpperCase()}
        '2${removeOGDataHeader11[3]}
        ${week ? 'W' + week : ''}
        –
        ${dataHeader1[2]} day left
        (Updated at : ${convertModule.toLocaleString(infoStore?.snapshotData?.openInterestInfo)})
      `;

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
          text: subtitle,
          margin: 30,
          style: {
            color: '#999999'
          },
        },
        title: {
          text: title,
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
            },
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
    infoStore.getOpenInterest(3000).then(() => {
      for (let i = 0; i < 10; i++) {
        const dataHeader0 = this.data.header[0].split(",")[i + 1].split("|");
        const removeGCDataHeader01 = dataHeader0[1].replace("GC", "").match(/^([A-Za-z]+)(\d+)$/);

        const title = `
          ${dataHeader0[1]}
          (${this.mapMonths[removeGCDataHeader01[1]]} 202${removeGCDataHeader01[2]})
        `;

        this.chart.data.push({
          name: title,
          slot: i,
        });
      }


      // const dataHeader1 = this.data.header[1].split(",")[this.chart.selected.slot + 1].split("|");
      // // const removeGCDataHeader01 = dataHeader0[1].replace("GC", "").match(/^([A-Za-z]+)(\d+)$/);
      // const removeOGDataHeader11 = dataHeader1[1].replace("OG", "").match(/^(\d*)([A-Za-z]+)(\d+)$/);
      // console.log(this.mapMonths);
      // console.log(this.data.header);
      // console.log(dataHeader1);

      this.chart.selected = this.chart.data[0];

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

<style>
</style>
