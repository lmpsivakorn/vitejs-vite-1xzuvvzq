<template>
	<VCard class="pb-10">
    <VCardTitle class="d-flex justify-space-between pa-4 px-6">
      <div>
				<div class="font-semibold text-xl text-slate-900 dark:text-white">
					ForexFactory
				</div>
				<div class="text-sm text-slate-800 dark:text-slate-300">
					{{ subtitle }}
				</div>
			</div>
			<div class="d-flex text-sm align-end">
				<VIcon
					icon="tabler-clock"
					class="text-secondary-500 mr-2 text-lg"
				/>
				<span style="width: 50px;">{{ getTimes }}</span>
			</div>
    </VCardTitle>

		<hr class="border-thin" />

		<div v-if="loading" class="flex flex-col justify-center items-center h-[420px]">
			<div class="spinner text-base"></div>
		</div>
		<div v-else>
			<div class="overflow-x-auto">
				<!-- <table class="w-full dark:text-white"> -->
        <VTable class="text-no-wrap">
					<thead>
						<tr class="bg-stone-400/25">
							<th class="text-center min-w-[80px]">TIME</th>
							<th class="text-center max-w-[100px]">CURRENCY</th>
							<th class="text-center max-w-[80px]">IMPACT</th>
							<th class="text-left min-w-[320px]">DETAIL</th>
							<th class="text-center min-w-[100px]">ACTUAL</th>
							<th class="text-center min-w-[100px]">FORECAST</th>
							<th class="text-center min-w-[100px]">PREVIOUS</th>
							<th class="text-center max-w-[100px]">15M Vol</th>
							<th class="text-center max-w-[100px]">30M Vol</th>
							<th class="text-center max-w-[100px]">1H Vol</th>
							<th class="text-left min-w-[30px]"></th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-if="filteredData.length === 0"
							class="border-b-[1px] dark:border-white/5"
						>
							<td colspan="11" class="text-center">
								<span class="text-sm text-gray-500">No data</span>
							</td>
						</tr>
						<tr
							v-for="(item, index) in filteredData" :key="index"
							:class="[isItemHasPassed(item) ? 'opacity-50' : '',]"
						>
							<td class="text-center">
								<span class="position-relative">
									<VIcon
										v-if="item[0] === marked"
										icon="tabler-player-play-filled"
										class="text-success position-absolute ml-n7"
									/>
									{{ item[2] }}
								</span>
							</td>
							<td class="text-center">{{ item[3] }}</td>
							<td class="text-center content-center">
                <v-chip
                  :color="item[4] === 'High Impact Expected' ? 'error' : item[4] === 'Medium Impact Expected' ? 'warning' : '#FFEE58'"
                  :label="false"
                  :variant="isDarkMode ? 'tonal' : 'elevated'"
                >
                  {{ item[4] === 'High Impact Expected' ? 'HIGH' : item[4] === 'Medium Impact Expected' ? 'MEDIUM' : 'LOW' }}
                </v-chip>
							
								<!-- <Badge
									:label="item[4] === 'High Impact Expected' ? 'HIGH' : item[4] === 'Medium Impact Expected' ? 'MEDIUM' : 'LOW'"
									:badgeClass="{
										'bg-danger-500 text-danger-500 bg-opacity-[0.12] pill': item[4] === 'High Impact Expected',
										'bg-orange-500 text-orange-500 bg-opacity-[0.12] pill': item[4] === 'Medium Impact Expected',
										'bg-yellow-500 text-yellow-500 bg-opacity-[0.12] pill': !['High Impact Expected', 'Medium Impact Expected'].includes(item[4])
									}"
								/> -->
							</td>
							<td class="text-left">{{ item[5] }}</td>
							<td
								class="text-center"
								:class="{
									'text-red-500': item[6] === 'worse',
									'text-green-500': item[6] === 'better',
								}"
							>
								<span v-if="item[7]">
									{{ item[7] }}
								</span>
								<span v-else-if="item[0] - time.getTime() > -60 * 1000 && item[0] - time.getTime() < 60 * 1000">
									<span v-if="item[0] - time.getTime() > 0">
										<!-- <Badge
											:label="`${Math.ceil((item[0] - time.getTime()) / 1000)}s`"
											badgeClass="bg-primary-500 text-white pill"
										/> -->

                    <v-chip
                      color="primary"
                      variant="tonal"
                    >
                      {{ Math.ceil((item[0] - time.getTime()) / 1000) }}s
                    </v-chip>
									</span>
									<span v-else>
										<!-- <Badge label="coming" badgeClass="bg-warning-500 text-white pill badgeblink" /> -->

                    <v-chip
                      color="orange"
                      variant="tonal"
                      class="badgeblink"
                    >
                      coming
                    </v-chip>
									</span>
								</span>
							</td>
							<td 
								class="text-center"
								:class="{
									'text-red-500': item[8] === 'worse',
									'text-green-500': item[8] === 'better',
								}"
							>
								{{ item[9] }}
							</td>
							<td
								class="text-center"
								:class="{
									'text-red-500': item[10] === 'worse',
									'text-green-500': item[10] === 'better',
								}"
							>
								<span class="position-relative">
									{{ item[11] }}
									<VIcon
										v-if="item[12] === 'revised'"
										icon="heroicons:arrow-left-circle-16-solid"
										class="text-orange-500 position-absolute right-[-18px] top-[2px]"
									/>
								</span>
							</td>
							<td class="text-center">
								<span v-if="volatilities[item[0]] && volatilities[item[0]]['15m'].range" class="inline-flex items-center space-x-1 text-sm">
									<span>{{ convertModule.toNumberCommaDecimal(volatilities[item[0]]['15m'].range) }}$</span>
									<span :class="[volatilities[item[0]]['15m'].max > 0 ? 'text-green-500' : 'text-red-500']">({{ convertModule.toNumberCommaDecimal(volatilities[item[0]]['15m'].max) }}$)</span>
								</span>
							</td>
							<td class="text-center">
								<span v-if="volatilities[item[0]] && volatilities[item[0]]['30m'].range" class="inline-flex items-center space-x-1 text-sm">
									<span>{{ convertModule.toNumberCommaDecimal(volatilities[item[0]]['30m'].range) }}$</span>
									<span :class="[volatilities[item[0]]['30m'].max > 0 ? 'text-green-500' : 'text-red-500']">({{ convertModule.toNumberCommaDecimal(volatilities[item[0]]['30m'].max) }}$)</span>
								</span>
							</td>
							<td class="text-center">
								<span v-if="volatilities[item[0]] && volatilities[item[0]]['1h'].range" class="inline-flex items-center space-x-1 text-sm">
									<span>{{ convertModule.toNumberCommaDecimal(volatilities[item[0]]['1h'].range) }}$</span>
									<span :class="[volatilities[item[0]]['1h'].max > 0 ? 'text-green-500' : 'text-red-500']">({{ convertModule.toNumberCommaDecimal(volatilities[item[0]]['1h'].max) }}$)</span>
								</span>
							</td>
							<td>
                <VBtn
                  v-if="newsMatched(item[5]) && !!news.slug[item[5]]"
                  icon="tabler-align-left"
                  variant="text"
                  color="secondary"
                  @click="$router.push({ name: 'news', params: { slug: news.slug[item[5]] } })"
                />
							</td>
						</tr>
					</tbody>
        </VTable>
			</div>

			<div class="text-center mt-3 mb-2">DATE</div>
			<div class="text-center flex justify-center">
        <VBtnToggle
          :modelValue="dates.findIndex(item => item === selectedDate)"
          density="compact"
          mandatory
        >
          <VBtn
            v-for="date in dates"
            :key="date"
            size="x-small"
            @click="chooseDate(date)"
          >
            {{ String(date).padStart(2, '0') }}
          </VBtn>
        </VBtnToggle>
			</div>
    </div>
	</VCard>
</template>

<script>
import {mapState} from "pinia";
import {useConfigStore} from '@core/stores/config';
import {InfoStore} from "@/store/info";

import convertModule from "@/modules/convert.js";

import { processVolatilities } from "../scripts/processVolatilities.js";

const configStore = useConfigStore();
const infoStore = InfoStore();

const decimalFormat = new Intl.NumberFormat('th-TH', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default {
  data: () => ({
		convertModule,
    loading: true,

		marked: false,
		selectedDate: null,

		time: new Date(),

		additionalGoldInfoFetched: false,
		additionalGoldInfo: [],

		// filteredDatas: null,
		// volatilities: {},
  }),

  computed: {
		...mapState(InfoStore, {
			data: 'forexfactoryInfo',
			goldInfo: 'goldExnessesInfo',
			news: 'forexfactoryNewsInfo',
		}),

    isDarkMode () {
      return configStore.theme === 'dark';
    },

		dates () {
			const dates = [];
			const today = new Date();
			const {datas} = this.data;
			let date = null;
			for (let i = 0; i < datas?.length || 0; ++i) {
				date = new Date(datas[i][0]);
				if (!dates.includes(date.getDate())) {
					dates.push(date.getDate());
				}
			}
			this.selectedDate = dates.reduce((prev, curr) => Math.abs(curr - today.getDate()) < Math.abs(prev - today.getDate()) ? curr : prev, null) // Find the closest date

			return dates;
		},

		filteredDatas () {
			if (!this.data.datas) return [];
			return this.data.datas.filter(item => item[3] === 'USD');
		},

		filteredData () {
			const today = this.time;
			if (this.marked) {
				if (this.marked < today.getTime() - 1 * 60 * 1000) {
					this.marked = null;
				}
			}

			return this.filteredDatas.filter(item => {
				if (!this.marked && parseInt(item[0]) > today.getTime()) {
					this.marked = item[0];
				}

				return new Date(item[0]).getDate() === this.selectedDate;
			})
		},

		volatilities () {
			if (!this.data.datas || !this.goldInfo) return {};
			return processVolatilities(this.filteredDatas, this.additionalGoldInfo.concat(this.goldInfo));
		},

		getTimes () {
			return `${this.time.getHours().toString().padStart(2, '0')}:${this.time.getMinutes().toString().padStart(2, '0')}:${this.time.getSeconds().toString().padStart(2, '0')}`;
		},

		subtitle () {
      if (infoStore && infoStore.snapshotData && infoStore.snapshotData.goldNewsInfo) {
        return `Updated at : ${convertModule.toLocaleString(infoStore.snapshotData.forexfactoryInfo)}`;
      }

      return '-';
    },
	},

	mounted () {
		infoStore.getForexFactory().then(() => {
			infoStore.getForexFactoryNewsSlug();
			infoStore.getGoldExnesses();

			// infoStore.getGoldExnesses().then(() => {			
			// 	infoStore.getGoldExnessesCache(true).then((datas) => {
			// 		datas.concat(this.goldInfo);
			// 		console.log(datas)
			// 	}).catch((error) => {
			// 		console.error("Error fetching additional gold info:", error);
			// 	});
			// })

			this.loading = false;
		});

		setInterval(() => {
			this.time = new Date();
			// this.time.setHours(this.time.getHours() + 9);
			// this.time.setMinutes(this.time.getMinutes() + 5);
		}, 1000);
  },

	methods: {
		chooseDate (item) {
			this.selectedDate = item;

			if (!this.additionalGoldInfoFetched) {
				const currIndex = this.dates.findIndex(date => date === this.time.getDate());
				const selectedIndex = this.dates.findIndex(date => date === item.value);
				if (currIndex - selectedIndex > 2) { // Fetch additional gold info only if the selected date is behind more than 2 days
					this.additionalGoldInfoFetched = true;
					infoStore.getGoldExnessesCache((this.dates[0] || 0) > this.time.getDate()).then((datas) => {
						this.additionalGoldInfo = datas;
					}).catch((error) => {
						console.error("Error fetching additional gold info:", error);
					});
				}
			} 
		},

    floatFormat (v) {
      return decimalFormat.format(v);
    },

		newsMatched (txt) {
			return !!this.news.slug[txt];
		},

		isItemHasPassed (item) {
			if (item[2].includes("Day")) {
				if (this.time.getTime() - (24 * 60 * 60 * 1000) > item[0]) {
					return true;
				}

				return false;
			}

			if (this.time.getTime() - (60 * 1000) > item[0]) {
				return true;
			}

			return false;
		},
  },

	unmounted () {
		infoStore.setActive('forexfactoryInfo', 'remove');
		infoStore.setActive('goldExnessesInfo', 'remove');
	},
};
</script>

<style lang="scss" scoped>
/* CSS สำหรับ badge */
.badgeblink {
  /* Animation ให้กระพริบ */
  animation: blink 1s infinite; /* ชื่อ animation, ระยะเวลา, เล่นซ้ำไม่สิ้นสุด */
}

/* @keyframes สำหรับ animation การกระพริบ */
@keyframes blink {
  0% {
    opacity: 1; /* เริ่มต้นที่ทึบ (ไม่โปร่งใส) */
  }
  50% {
    opacity: 0; /* ครึ่งทางที่โปร่งใส */
  }
  100% {
    opacity: 1; /* กลับมาทึบอีกครั้ง */
  }
}
</style>
