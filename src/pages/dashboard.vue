<template>
  <div>
    <v-row>
      <v-col cols="12">
        <GoldExnessChart />
      </v-col>

      <v-col cols="12">
        <ForexFactoryTable />
      </v-col>

      <v-col cols="12" lg="7" xl="8">
        <GoldTonChart />
      </v-col>

      <v-col cols="12" lg="5" xl="4">
        <GoldTradingsterChart />
        <!-- <VCard class="pa-10 text-center">
          <h1>COT Report</h1>
        </VCard>     -->
      </v-col>

      <v-col cols="12">
        <OpenInterest />
      </v-col>

      <v-col cols="12">
        <!-- <GoldKitcosChart /> -->
        <VCard class="pa-10 text-center">
          <h1>Gold Futures Key Zone</h1>
        </VCard>  
      </v-col>

      <v-col cols="12" lg="6">
        <!-- <GoldKitcosAmPmLaserChart /> -->
        <VCard class="pa-10 text-center">
          <h1>Resistance/Support</h1>
        </VCard>  
      </v-col>

      <v-col cols="12" lg="6">
        <!-- <GoldSentiment /> -->
        <VCard class="pa-10 text-center">
          <h1>Gold Sentiment</h1>
        </VCard>  
      </v-col>

      <v-col cols="12">
        <!-- <GoldMyFxBooksOrderBookChart /> -->
        <VCard class="pa-10 text-center">
          <h1>Order Book (Positions)</h1>
        </VCard>  
      </v-col>
    </v-row>
  </div>
</template>
<script>
import GoldExnessChart from "./components/GoldExnessChart.vue";
// import GoldExnessChartOri from "./components/GoldExnessChartOri.vue";
// import GoldKitcosChart from "./components/GoldKitcosChart.vue";

import ForexFactoryTable from "./components/ForexFactoryTable.vue";
// import GoldKitcosAmPmLaserChart from "./components/GoldKitcosAmPmLaserChart.vue";
// import GoldMyFxBooksOrderBookChart from "./components/GoldMyFxBooksOrderBookChart.vue";
// import GoldSentiment from "./components/GoldSentiment.vue";
import GoldTonChart from "./components/GoldTonChart.vue";
import GoldTradingsterChart from "./components/GoldTradingsterChart.vue";
import OpenInterest from "./components/OpenInterest.vue";


export default {
  components: {
    GoldExnessChart,
    // GoldExnessChartOri,
    // GoldKitcosChart,

    ForexFactoryTable,
    // GoldKitcosAmPmLaserChart,
    // GoldMyFxBooksOrderBookChart,
    // GoldSentiment,
    GoldTonChart,
    GoldTradingsterChart,
    OpenInterest,
  },
  data() {
    return {
      
    };
  },
  
  computed: {

  },
};
</script>
<style></style>
