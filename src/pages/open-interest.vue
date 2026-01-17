<template>
  <div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12">
        <OpenInterest />
      </div>

      <div class="col-span-12 mt-6">
        <OpenInterestSplit />
      </div>
    </div>
  </div>
</template>

<script>
import OpenInterest from "./components/OpenInterest.vue";
import OpenInterestSplit from "./components/OpenInterestSplit.vue";

export default {
  components: {    
    OpenInterest,
    OpenInterestSplit,
  },
};
</script>
