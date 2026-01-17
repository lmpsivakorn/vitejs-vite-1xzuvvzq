<template>
	<VCard class="pa-4 pb-10">
    <VCardTitle class="d-flex justify-space-between pa-4 px-6">
      <div>
				<div class="font-semibold text-xl">
					XAUUSD
        </div>
			</div>
      <div>
        <VBtnToggle
          :modelValue="timeframeButtons.findIndex(item => item.value === timeframe)"
          density="comfortable"
          mandatory
        >
          <VBtn
            v-for="time in timeframeButtons"
            :key="time"
            size="x-small"
            @click="timeframe = time.value"
          >
            {{ time.title }}
          </VBtn>
        </VBtnToggle>
      </div>
    </VCardTitle>

		<div
      v-if="loading"
      class="d-flex flex-column justify-center items-center"
      style="height: 420px;"
    >
			<div class="spinner text-base"></div>
		</div>
		<div
      v-else
      class="position-relative"
    >      
      <div
        class="crosshair-tooltip position-absolute pointer-events-none pa-2 rounded shadow-lg-opacity"
        :class="{'bg-blue-grey-darken-3': isDarkMode, 'bg-white': !isDarkMode}"
        style="z-index: 10;"
      >
        <div class="lightweight-charts-tooltip"></div>
      </div>
      <div ref="candleChart" />
    </div>
	</VCard>
</template>

<script>
import {mapState} from "pinia";
import {InfoStore} from "@/store/info";
import {useConfigStore} from '@core/stores/config';

import { CandlestickSeries, createChart } from 'lightweight-charts';

const infoStore = InfoStore();
const configStore = useConfigStore();

const decimalFormat = new Intl.NumberFormat('th-TH', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const isArrayEqual = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export default {
  
  data: () => ({
    loading: true,
    chart: null,
    candlestickSeries: null,
    // chartInfo: [],

    timeframeButtons: [
      { title: '15m', value: 900 },
      { title: '30m', value: 1800 },
      { title: '1hr', value: 3600 },
    ],
    timeframe: 900, // Default to 15 minutes
  }),
  computed: {
		...mapState(InfoStore, {data: 'goldExnessesInfo'}),

    isDarkMode () {
      return configStore.theme === 'dark';
    },

    chartOptions () {
      return {
        width: this.$refs.candleChart.clientWidth,
        height: 420,
        layout: {
          // backgroundColor: 'transparent',
          background: { type: 'solid', color: 'transparent' },
          textColor: this.isDarkMode ? '#CBD5E1' : '#475569',
        },
        grid: {
          vertLines: {
            color: this.isDarkMode ? '#334155' : '#E2E8F0',
          },
          horzLines: {
            color: this.isDarkMode ? '#334155' : '#E2E8F0',
          },
        },
        crosshair: {
          mode: 1, // 1 for normal crosshair
          horzLine: {
            visible: true,
            labelVisible: true,
          },
          vertLine: {
            visible: true,
            labelVisible: true,
          },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
        },
      }
    },

    chartInfo () {
      return this.data?.map((item, i) => ({
        time: (Date.parse(item.t) + (7 * 60 * 60 * 1000)) / 1000,
        ...isArrayEqual(item.i, this.data[i + 1]?.i)
          && (!this.data[i + 2] || isArrayEqual(item.i, this.data[i + 2]?.i)) ? {} : {
            open: item.i[0],
            high: item.i[1],
            low: item.i[2],
            close: item.i[3],
          }
      })) || [];
    },
	},

  watch: {
    isDarkMode: function (isDark) {
      if (this.chart) {
        this.$nextTick(() => {
          this.chart.applyOptions({
            grid: {
              vertLines: {
                color: isDark ? '#334155' : '#E2E8F0',
              },
              horzLines: {
                color: isDark ? '#334155' : '#E2E8F0',
              },
            },
          });
        });
      }
    },

    chartInfo: {
      handler (value, oldValue) {
        if (this.chart && this.candlestickSeries) {
          const vr = this.chart.timeScale().getVisibleRange();
          this.candlestickSeries.setData(value);
          if (vr) {
            this.chart.timeScale().setVisibleRange(vr);
          }
        }
      },
      immediate: true,
      deep: true,
    },

    timeframe (value) {
      const vr = this.chart.timeScale().getVisibleRange();
      // this.candlestickSeries.setData(this.chartInfo.filter(item => item.time % value === 0));
      if (value === 15) {
        this.candlestickSeries.setData(this.chartInfo);
      } else {
        let info = null;
        const list  = [];
        
        for (let i = 0; i < this.chartInfo.length; ++i) {
          if (this.chartInfo[i].time % value !== 0) {
            continue;
          }
          
          info = {...this.chartInfo[i]};
          for (let j = i + 1; j < this.chartInfo.length; ++j) {
            i = j - 1; // Adjust i to continue from the next item
            if (this.chartInfo[j].time % value === 0) {
              break;
            }
            // info.open = info.open > this.chartInfo[j].open ? info.open : this.chartInfo[j].open; // use 15m
            info.high = info.high > this.chartInfo[j].high ? info.high : this.chartInfo[j].high;
            info.low = info.low < this.chartInfo[j].low ? info.low : this.chartInfo[j].low;
            // info.close = info.close < this.chartInfo[j].close ? info.close : this.chartInfo[j].close;
            info.close = this.chartInfo[j].close; // use self
            if (info.open === undefined || info.high === undefined || info.low === undefined || info.close === undefined) {
              info.open = undefined;
              info.high = undefined;
              info.low = undefined;
              info.close = undefined;
            }
          }
          list.push(info);
        }
        this.candlestickSeries.setData(list);
      }
      this.chart.timeScale().setVisibleRange(vr);
    }
  },

  mounted () {
    infoStore.getGoldExnesses().then(() => {
      this.loading = false;

      // Initialize the chart
      if (this.chart) {
        this.chart.remove();
      }

      this.chartInfo = this.data.map((item, i) => ({
        time: (Date.parse(item.t) + (7 * 60 * 60 * 1000)) / 1000,
        ...isArrayEqual(item.i, this.data[i + 1]?.i)
          && (!this.data[i + 2] || isArrayEqual(item.i, this.data[i + 2]?.i)) ? {} : {
            open: item.i[0],
            high: item.i[1],
            low: item.i[2],
            close: item.i[3],
          }
        })
      );

      this.$nextTick(() => {
        this.$refs.candleChart.innerHTML = ''; // Clear previous chart
        this.chart = createChart(this.$refs.candleChart, this.chartOptions);
        this.candlestickSeries = this.chart.addSeries(CandlestickSeries, {
          upColor: '#50C793',
          downColor: '#F1595C',
          borderUpColor: '#50C793',
          borderDownColor: '#F1595C',
          wickUpColor: '#50C793',
          wickDownColor: '#F1595C',
        });
        this.candlestickSeries.setData(this.chartInfo);
        this.chart.timeScale().fitContent();
        this.chart.subscribeCrosshairMove((param) => {
          if (!param || !param.time) return;
          const price = param.seriesData.get(this.candlestickSeries) || param.seriesData.values().next().value;
          if (price) {
            const tooltip = document.querySelector('.lightweight-charts-tooltip');
            tooltip.innerHTML = `
              <div>Time: ${new Date(param.time * 1000).toLocaleString("th-US", { timeZone: "UTC" })}</div>
              <div>Open: ${decimalFormat.format(price.open)}</div>
              <div>High: ${decimalFormat.format(price.high)}</div>
              <div>Low: ${decimalFormat.format(price.low)}</div>
              <div>Close: ${decimalFormat.format(price.close)}</div>
            `;
          }
        });
        this.chart.timeScale().scrollToRealTime();
        // this.chart.timeScale().subscribeVisibleTimeRangeChange(() => {
        //   this.chart.timeScale().fitContent();
        // });
      });
    }).catch((error) => {
    console.error("Error fetching gold exnesses:", error);
    });

    // Initialize the chart
    /*
    if (this.chart) {
      this.chart.remove();
    }
    */

    /*
    this.$nextTick(() => {
      this.$refs.candleChart.innerHTML = ''; // Clear previous chart
      this.chart = createChart(this.$refs.candleChart, this.chartOptions);
      this.candlestickSeries = this.chart.addSeries(CandlestickSeries, {
        upColor: '#50C793',
        downColor: '#F1595C',
        borderUpColor: '#50C793',
        borderDownColor: '#F1595C',
        wickUpColor: '#50C793',
        wickDownColor: '#F1595C',
      });
      this.candlestickSeries.setData(this.chartInfo);
      this.chart.timeScale().fitContent();
      this.chart.subscribeCrosshairMove((param) => {
        if (!param || !param.time) return;
        const price = param.seriesData.get(this.candlestickSeries) || param.seriesData.values().next().value;
        if (price) {
          const tooltip = document.querySelector('.lightweight-charts-tooltip');
          tooltip.innerHTML = `
            <div>Time: ${new Date(param.time * 1000).toLocaleString("th-US", { timeZone: "UTC" })}</div>
            <div>Open: ${decimalFormat.format(price.open)}</div>
            <div>High: ${decimalFormat.format(price.high)}</div>
            <div>Low: ${decimalFormat.format(price.low)}</div>
            <div>Close: ${decimalFormat.format(price.close)}</div>
          `;
        }
      });
      this.chart.timeScale().scrollToRealTime();
      // this.chart.timeScale().subscribeVisibleTimeRangeChange(() => {
      //   this.chart.timeScale().fitContent();
      // });
    });
    */
  },

	methods: {
    floatFormat (v) {
      return decimalFormat.format(v);
    },
  },

  unmounted () {
    infoStore.setActive('goldExnessesInfo', 'remove');
  },
};
</script>

<style lang="scss" scoped>
.order-book-row {
  height: 28.5px;
  line-height: 28.5px;
  margin-bottom: 3.2px;
}
</style>
