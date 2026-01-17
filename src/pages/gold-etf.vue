<template>
  <div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12">
        <GoldTonChart />
      </div>

      <div class="col-span-12 mt-6">
        <GoldTonTable />
      </div>
    </div>
  </div>
</template>

<script>

import GoldTonChart from "./components/GoldTonChart.vue";
import GoldTonTable from "./components/GoldTonTable.vue";

export default {
  components: {    
    GoldTonChart,
    GoldTonTable,
  },
};
</script>
