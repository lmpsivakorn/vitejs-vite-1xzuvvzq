<script setup>
import { VForm } from 'vuetify/components/VForm'
import { MemberStore } from "@/store/member.js"

const memberStore = MemberStore()

const $toast = inject('$toast')()
const loading = ref(false)
const confirmLinkAccountDialog = ref(false)
const infoRef = ref('')
const infoTemp = ref(null)
const form = ref()

/**
 * Actions
 */
const requestLink = async () => {
  const { errors, valid } = await form.value.validate()
  if (!valid)
    return

  loading.value = true

  const result = await memberStore.getExnessAccount({ exnessClientID: infoRef.value })
    .then(result => result)
    .catch(err => err)
    .finally(() => {
      loading.value = false
    })

  if (result.error) {
    if([901, 902].includes(result.error.code)) {
      $toast.add({
        severity: 'error',
        text: "Cannot request your Exness's info. Please check your Client ID again.",
        life: 30000,
        error: result.error,
      })
    } else {
      const msg = result.error.message || (result.error.code === 423 ? "The Exness's account has been linked with another member." : "Cannot get Exness's account info.")

      $toast.add({
        severity: 'error',
        text: msg,
        life: 15000,
      })
    }

    return
  }

  infoTemp.value = result.data
  confirmLinkAccountDialog.value = true
}

const confirmLinkAccount = async () => {
  if (!infoTemp.value) {
    $toast.add({
      severity: 'error',
      text: "Please specify the Client ID before linking the account.",
      life: 1500000,
    })

    return
  }

  loading.value = true

  const result = await memberStore.confirmLinkExnessAccount()
    .then(result => result)
    .catch(err => err)
    .finally(() => {
      loading.value = false
    })

  if (result.error) {
    const msg = result.error.message || `Cannot link Exness's account. ${result.error.code || ""}`

    $toast.add({
      severity: 'error',
      text: msg,
      life: 20000,
    })
  } else {
    // memberStore.user.exness = result.exness

    $toast.add({
      severity: 'success',
      text: "Your Exness's account has been linked.",
      life: 15000,
    })

    confirmLinkAccountDialog.value = false
  }
}

const confirmUnlinkAccount = async () => {
  loading.value = true

  const result = await memberStore.confirmUnlinkExnessAccount()
    .then(result => result)
    .catch(err => err)
    .finally(() => {
      loading.value = false
    })

  if (result.error) {
    const msg = result.error.message || `Cannot unlink Exness's account. ${result.error.code || ""}`

    $toast.add({
      severity: 'error',
      text: msg,
      life: 20000,
    })
  } else {
    // memberStore.user.exness = result.exness

    $toast.add({
      severity: 'success',
      text: "Your Exness's account has been unlinked.",
      life: 15000,
    })
  }
}
</script>

<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <VDialog
    v-model="confirmLinkAccountDialog"
    persistent
    class="v-dialog-sm"
    max-width="360"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="confirmLinkAccountDialog = !confirmLinkAccountDialog" />

    <!-- Dialog Content -->
    <VCard title="ยืนยันการผูกบัญชี?">
      <VCardText class="d-flex justify-end gap-3 flex-wrap">
        <VBtn
          v-if="!memberStore.user?.exness || !memberStore.user.exness?.linked"
          class="px-2"
          :icon="$vuetify.display.smAndDown"
          :loading="loading"
          :disabled="loading"
          @click="confirmLinkAccount($event)"
        >
          <VIcon
            icon="tabler-link"
            color="#fff"
            size="18"
          />
          <span
            v-if="$vuetify.display.mdAndUp"
            class="ms-2"
          >
            ยืนยันการผูกบัญชี exness: <b>{{ infoTemp?.clientAccount || '???' }}</b>
          </span>
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>

  <VBtn
    v-if="memberStore.user?.exness?.linked"
    class="px-2"
    :disabled="loading"
    :loading="loading"
    :icon="$vuetify.display.smAndDown"
    @click="confirmUnlinkAccount"
  >
    <VIcon
      icon="tabler-link-off"
      color="#fff"
      size="18"
    />
    <span
      v-if="$vuetify.display.mdAndUp"
      class="ms-2"
    >
      ยกเลิกผูกบัญชี exness: <b>{{ memberStore.user.exness.clientAccount || '???' }}</b>
    </span>
  </VBtn>

  <VForm
    v-else
    ref="form"
    @submit.prevent
  >
    <AppTextField
      v-model="infoRef"
      placeholder="Exness Client ID"
      type="text"
      class="textfield-connect"
      :disabled="loading"
      :clearable="!loading"
      :rules="[v => requiredValidator(v) === true || 'Please input Exness Client ID.']"
    >
      <!-- AppendInner -->
      <template #append-inner>
        <VFadeTransition leave-absolute>
          <VProgressCircular
            v-if="loading"
            color="primary"
            width="3"
            size="24"
            class="me-2"
            indeterminate
          />

          <VBtn
            v-else
            type="submit"
            class="rounded-s-0 rounded-e px-2 "
            :disabled="loading"
            :icon="$vuetify.display.smAndDown"
            @click="requestLink"
          >
            <VIcon
              icon="tabler-viewfinder"
              color="#fff"
              size="18"
            />
            <span
              v-if="$vuetify.display.mdAndUp"
              class="ms-2"
            >
              ผูกบัญชี exness  
            </span>
          </VBtn>
        </VFadeTransition>
      </template>
    </AppTextField>
  </VForm>
</template>

<style lang="scss" scoped>
.textfield-connect {
  :deep(.v-input) {
    .v-field--appended {
      padding-inline-end: 0 !important;
    }
  }
}
</style>
