<script setup>
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { AuthStore } from '@/store/auth'
import { getAuth, linkWithCredential, PhoneAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { instanceAuth } from '@/plugins/firebase'
import { inject, onMounted } from 'vue'

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
const otp = ref('')
const isOtpInserted = ref(false)
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
})

async function resend () {
  if (recaptchaVerifier.value === null) {
    await useRecaptchaVerifier()
  } else {
    recaptchaVerifier.value.clear()
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(instanceAuth, authStore.tmp.telephone, recaptchaVerifier.value)
    authStore.tmp.verifyId = confirmationResult.verificationId
    void onFinish()
  } catch(err) {
    if (err.code?.includes('captcha')) {
      await useRecaptchaVerifier()
    }

    isLoading.value = false

    $toast.add({
      severity: 'error',
      text: "Unable to send OTP code to phone number. Please check your phone number again.",
      life: 30000,
      error: err
    })
  }
}

const onFinish = async () => {
  isOtpInserted.value = true
  try {
    const credential = PhoneAuthProvider.credential(authStore.tmp.verifyId, otp.value)

    const updated = await linkWithCredential(instanceAuth.currentUser, credential).then(async usercred => {
      await authStore.linkCredential({ provider: 'phone' })

      return usercred
    })

    if (typeof updated.user.phoneNumber === 'string') {
      authStore.tmp = {
        telephone: null,
        verifyId: null,
      }
      authStore.profile.telephone = updated.user.phoneNumber
      router.replace('/')
    }
  } catch (err) {
    otp.value = ''
    isOtpInserted.value = false

    $toast.add({
      severity: 'error',
      text: "Unable to send OTP code to phone number. Please check your phone number again.",
      life: 30000,
      error: err
    })
  }
}
</script>

<template>
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
            Phone Number Verification 💬
          </h4>
          <p class="mb-1">
            We sent a verification code to your mobile. Enter the code from the mobile in the field below.
          </p>
          <h6 class="text-h6">
            {{ authStore.tmp.telephone }}
          </h6>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <h6 class="text-body-1">
                  Type your 6 digit security code
                </h6>
                <VOtpInput
                  v-model="otp"
                  :disabled="isOtpInserted"
                  type="number"
                  class="pa-0"
                  @finish="onFinish"
                />
              </VCol>

              <!-- reset password -->
              <VCol cols="12">
                <VBtn
                  :loading="isOtpInserted"
                  :disabled="isOtpInserted"
                  block
                  type="submit"
                >
                  Verify my account
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <div class="d-flex justify-center align-center flex-wrap">
                  <span class="me-1">Didn't get the code?</span>
                  <a @click="resend">Resend</a>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
      <div id="recaptcha-container" />
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";

.v-otp-input {
  .v-otp-input__content {
    padding-inline: 0;
  }
}
</style>
