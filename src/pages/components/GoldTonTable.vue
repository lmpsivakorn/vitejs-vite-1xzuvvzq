<template>
  <VCard class="pa-4 pb-10">
    <div
      v-if="loading"
      class="flex flex-col justify-center items-center h-[420px]"
    >
      <div class="spinner text-base"></div>
    </div>
    <div
      v-else
      class="legend-ring4"
    >
      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Country</th>
            <th>Name</th>
            <th class="text-right">Held (t)</th>
            <th class="text-right">AUM</th>
            <th class="text-right">Weekly Changes</th>
            <th class="text-right">Monthly Changes</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in golds"
            :key="item.ticker"
          >
            <td>{{ item.ticker }}</td>
            <td>{{ item.country }}</td>
            <td>{{ item.name }}</td>
            <td class="text-right">{{ item.tonnes_in_trust }}</td>
            <td class="text-right">{{ item.aum }}</td>
            <td class="text-right">
              {{ convertModule.toNumberCommaDecimal(item.weekly_changes) }}
              <span
                :class="{
                  'text-success ': item.weekly_changes_percent > 100,
                  'text-error ': item.weekly_changes_percent < 100
                }"
                class="d-inline-block items-center text-xs"
                style="min-width: 4rem;"
              >
                <template v-if="item.weekly_changes_percent > 100">
                  <VIcon icon="tabler-arrow-narrow-up-dashed" class="mt-n1" />
                  {{ (item.weekly_changes_percent - 100).toFixed(2) }}%
                </template>
                <template v-else-if="item.weekly_changes_percent < 100">
                  <VIcon icon="tabler-arrow-narrow-down-dashed" />
                  {{ (100 - item.weekly_changes_percent).toFixed(2) }}%
                </template>
                <template v-else>
                  &nbsp;
                </template>
              </span>
            </td>
            <td class="text-right">
              {{ convertModule.toNumberCommaDecimal(item.monthly_changes) }}
              <span
                :class="{
                  'text-success ': item.monthly_changes_percent > 100,
                  'text-error ': item.monthly_changes_percent < 100
                }"
                class="d-inline-block items-center text-xs"
                style="min-width: 4rem;"
              >
                <template v-if="item.monthly_changes_percent > 100">
                  <VIcon icon="tabler-arrow-narrow-up-dashed" class="mt-n1" />
                  {{ (item.monthly_changes_percent - 100).toFixed(2) }}%
                </template>
                <template v-else-if="item.monthly_changes_percent < 100">
                  <VIcon icon="tabler-arrow-narrow-down-dashed" />
                  {{ (100 - item.monthly_changes_percent).toFixed(2) }}%
                </template>
                <template v-else>
                  &nbsp;
                </template>
              </span>
            </td>
          </tr>
        </tbody>
      </VTable>
    </div>
  </VCard>
</template>

<script>
import {mapState} from "pinia";
import {InfoStore} from "@/store/info";

import convertModule from "@/modules/convert";
import remoteConfigModule from "@/modules/remoteConfig";

export default {

  data() {
    return {
      convertModule,

      columns: [
        {
          label: 'Ticker',
          field: 'ticker',
          width: '30px',
        },
        {
          label: 'Country',
          field: 'country',
          width: '200px',
        },
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Held (t)',
          field: 'tonnes_in_trust',
          width: '100px',
        },
        {
          label: 'AUM',
          field: 'aum',
          width: '100px',
        },
        {
          label: 'Weekly Changes',
          field: 'weekly_changes',
          width: '100px',
        },
        {
          label: 'Monthly Changes',
          field: 'monthly_changes',
          width: '100px',
        },
      ],
      configGold: null,
      golds: [],
      loading: true,
    };
  },

  computed: {
    ...mapState(InfoStore, {dataGoldExnessInfo: 'goldExnessesInfo'}),
    ...mapState(InfoStore, {dataGoldTonEtfInfo: 'goldTonEtfInfo'}),
  },

  mounted () {
    InfoStore().getGoldTon()
      .then(async () => {
        const summaryDatas = {};
        const remove7DayDatas = {};
        const removeMonthDatas = {};
        
        this.dataGoldTonEtfInfo.currentMonth.forEach((item) => {
          const key = item.name;
          let summaryData = null;
          let pointer = null;
          const objDataLastMonth = this.dataGoldTonEtfInfo.lastMonth.find((el) => el.name === key);
          for (let i = 0; i < item.data.length; i++) {
            if (item.data[i] === null || i == item.data.length - 1 ) {
              const objDataCurrentMonth = this.dataGoldTonEtfInfo.currentMonth.find((el) => el.name === key);

              pointer = i - 7;
              if (pointer < 0) {
                pointer = objDataLastMonth.data.length + pointer;
                remove7DayDatas[key] = objDataLastMonth.data[pointer];
              } else {
                remove7DayDatas[key] = objDataCurrentMonth.data[pointer];
              }

              pointer = i - 30;
              pointer = pointer >= 0 ? -1 : pointer;
              pointer = objDataLastMonth.data.length + pointer;
              pointer = pointer < 0 ? 0 : pointer;
              removeMonthDatas[key] = objDataLastMonth.data[pointer];
              break;
            }

            summaryData = item.data[i];
          }

          if (summaryData) {
            summaryDatas[key] = summaryData;
          } else {
            summaryDatas[key] = objDataLastMonth.data[objDataLastMonth.data.length - 1];
          }

          // Fix abnormal data
          if (!summaryDatas[key]) {
            for (let i = 0; i < item.data.length; i++) {
              if (item.data[i] !== null) {
                summaryDatas[key] = item.data[i];
                remove7DayDatas[key] = item.data[i];
                removeMonthDatas[key] = item.data[i];
              }
            }
          }
        });

        await InfoStore().getGoldExnesses();
        const lastDataGoldExnessInfo = this.dataGoldExnessInfo[this.dataGoldExnessInfo.length - 1];

        remoteConfigModule.getConfig('gold_etf').then((configs) => {
          this.golds = configs.map((item) => {
            const key = item.key;
            
            let tonnes = summaryDatas[key] || 0;
            if (typeof tonnes === 'string') {
              tonnes = parseFloat(tonnes);
            }

            if (tonnes) {
              item.aum = convertModule.toNumberComma(tonnes * 32150.746 * lastDataGoldExnessInfo.i[0]);
            }

            const weeklyChanges = remove7DayDatas[key] || 0;
            const monthlyChanges = removeMonthDatas[key] || 0;

            return {
              aum: `$${item.aum}`,
              country: item.country,
              monthly_changes: monthlyChanges,
              monthly_changes_percent: tonnes ? (100 * monthlyChanges / tonnes) : 100,
              name: item.name,
              ticker: key.toUpperCase(),
              tonnes_in_trust: tonnes,
              weekly_changes: weeklyChanges,
              weekly_changes_percent: tonnes ? (100 * weeklyChanges / tonnes) : 100,
            };
          });

          this.loading = false;
        }).catch((error) => {
          console.error("Error fetching remote config:", error);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },

  unmounted () {
    InfoStore().setActive('goldExnessesInfo', 'remove');
		InfoStore().setActive('goldTonInfo', 'remove');
	},
};
</script>
