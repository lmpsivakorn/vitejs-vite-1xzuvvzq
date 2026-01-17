<template>
  <div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12">
        <ForexFactoryTable />
      </div>
    </div>
  </div>
</template>

<script>
import ForexFactoryTable from "./components/ForexFactoryTable.vue";

export default {
  components: {    
    ForexFactoryTable,
  },
};
</script>
