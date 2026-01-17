<script setup>
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { initializeRecaptchaConfig, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { AuthStore } from '@/store/auth'
import { instanceAuth } from '@/plugins/firebase'
import { onMounted } from 'vue'

import { getMemberRef, getMember } from '@/dataconnect-generated'
import { getDataConnect, subscribe } from 'firebase/data-connect'
import { inject } from 'vue'

definePage({
  meta: {
    layout: 'blank',
    public: false,
    requirePage: true,
  },
})
const $toast = inject('$toast')()
const authStore = AuthStore()
const router = useRouter()
const form = ref({ phone: '' })

const isDisableSubmit = ref(true)
const isLoading = ref(false)
const error = ref("")
const recaptchaVerifier = ref(null)
const useRecaptchaVerifier = async () => {
  if (recaptchaVerifier.value !== null) {
    recaptchaVerifier.value.clear()
    recaptchaVerifier.value = null
  }
  recaptchaVerifier.value = new RecaptchaVerifier(
    instanceAuth,
    'recaptcha-container',
    { size: "invisible"},
  )
  await (recaptchaVerifier.value)?.render();
}
onMounted(async () => {
  await nextTick()
  if (document.querySelector('#recaptcha-container') === null) {
    console.log('Element not found')

    return
  }
  if (recaptchaVerifier.value === null) {
    await useRecaptchaVerifier()
  } else {
    recaptchaVerifier.value.clear()
  }
})

async function next () {
  try {
    isLoading.value = true

    const telephone = `+66${String(form.value.phone).trim().replace(/^0/, '')}`
    const confirmationResult = await signInWithPhoneNumber(instanceAuth, telephone, recaptchaVerifier.value)

    authStore.tmp.telephone = telephone
    authStore.tmp.verifyId = confirmationResult.verificationId
    router.push({ name: 'auth-otp-verify' })
  } catch (err) {
    console.error("sendOTP error:", err)
    if (err.code?.includes('captcha')) {
      await useRecaptchaVerifier()
    }

    $toast.add({
      severity: 'error',
      text: "Unable to send OTP code to phone number. Please check your phone number again.",
      life: 30000,
      error: err
    })

    isLoading.value = false
    error.value = "ไม่สามารถส่ง OTP ได้ กรุณาลองใหม่"
  }
}
const onInputPhone = e => {
  form.value.phone  = e.target.value.replace(/\D/g, "").replace(/^0/, '').slice(0, 9)
  isDisableSubmit.value = !(form.value.phone.length === 9) || recaptchaVerifier.value === null
  error.value = ""
}

</script>

<template>
    <div id="recaptcha-container"/>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <VCardTitle>
            <RouterLink to="/">
              <div class="app-logo">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
                <h1 class="app-logo-title">
                  {{ themeConfig.app.title }}
                </h1>
              </div>
            </RouterLink>
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">
            Phone Verify
          </h4>
          <p class="mb-0">
            Enter your phone number and we'll send you an OTP sms
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- phone -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.phone"
                  autofocus
                  label="phone"
                  type="phone"
                  placeholder="xx xxx xxxx"
                  @input="onInputPhone"
                >
                  <template #default>
                    <div class="pr-2">
                      +66
                    </div>
                  </template>
                </AppTextField>
                <span class="text-sm">{{ error }}</span>
              </VCol>

              <VCol cols="12">
                <VBtn
                  block
                  :disabled="isDisableSubmit"
                  :loading="isLoading"
                  @click="next"
                >
                  Send OTP
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
iframe {
width: 100%;
}
</style>
