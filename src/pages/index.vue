<script setup>
import ExnessConnect from './components/exness-connect.vue'
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    public: false,
    unauthenticatedOnly: false
  },
})
</script>

<template>
  <div>
    <VCard
      class="mb-6"
      title="Exness"
    >
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            md="4"
            xl="3"
          >
            <ExnessConnect />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.textfield-connect {
  :deep(.v-input) {
    .v-field--appended {
      padding-inline-end: 0 !important;
    }
    // align-content: center;

    // .v-input__prepend,
    // .v-input__append {
    //   padding-block-start: 0 !important;
    // }

    // .v-input__prepend {
    //   align-items: center;
    // }

    // .v-field__append-inner .v-progress-circular svg {
    //   block-size: 1.3em;
    //   inline-size: 1.3em;
    // }

    // .v-field__append-inner svg {
    //   margin-block-start: 0.1rem;
    // }
  }
}
</style>
