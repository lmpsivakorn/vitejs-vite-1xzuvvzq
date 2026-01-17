<script setup>
import { useTheme } from 'vuetify'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import {
  initConfigStore,
  useConfigStore,
} from '@core/stores/config'
import { hexToRgb } from '@core/utils/colorConverter'

import { provide } from 'vue'
import Toast from '@core/components/Toast.vue'

const { global } = useTheme()

const toastService = ref(null)

provide('$toast', () => toastService.value)

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()

const configStore = useConfigStore()
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <Toast v-model="toastService" />
      <RouterView />

      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
