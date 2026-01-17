<script setup>
import { VSonner, toast } from 'vuetify-sonner'

import 'vuetify-sonner/style.css' // Required for snackbar background and text color

const model = defineModel()

const severityOption = v => {
  if (v === 'error') return {
    icon: 'tabler-circle-x',
    color: 'error',
    textClass: 'text-on-error',
  }
  else if (v === 'success') return {
    icon: 'tabler-circle-check',
    color: 'success',
    textClass: 'text-on-success',
  }
  else if (v === 'warning') return {
    icon: 'tabler-info-triangle',
    color: 'warning',
    textClass: 'text-on-warning',
  }

  return {
    icon: 'tabler-info-circle',
    color: 'primary',
    textClass: 'text-on-primary',
  }
}

model.value = {
  add (opt) {
    const severity = severityOption(opt.severity)

    if (opt.severity === 'error' && opt.error) {
      let desc = `<b>${opt.error.message}</b><ul>`
      for (const v in opt.error.validate || []) {
        desc += `<li>${v}<ul>`
        for (const p of opt.error.validate[v] || []) {
          desc += `<li>${p}</li>`
        }
        desc += '</ul></li>'
      } 
      desc += '</ul>'
      opt.desc = (opt.desc || '') + desc
    }

    toast(opt.text || null, {
      duration: opt.life || 5000,
      description: opt.desc || null, // subtitle of the snackbar
      cardProps: { // v-card props
        color: severity.color,
        class: 'overflow-visible',
      },
      cardTextProps: { // v-card-text props
        class: 'py-3 px-4 ' + severity.textClass,
      },
      cardActionsProps: { // v-card-actions props
        class: 'position-absolute ml-n7 mt-n2',
      },
      prependIcon: severity.icon,
      prependIconProps: { // v-icon props
        size: '50',
      },
      progressBar: false, // show or hide countdown progress bar
      progressBarProps: { // v-progress-linear props

      },
      reverseProgressBar: false, // changes progress bar direction
      loading: false, // makes progressbar indeterminate
      // avatar: null, // avatar image url,
      // multipleAvatars: [], // will display first 5 images
      // avatarProps: {}, // v-avatar props
      onDismiss: () => {},
      action: {
        // label: 'tabler-circle-x',
        onClick: () => {},
        buttonProps: { // v-btn props
          density: 'compact',
          icon: 'tabler-circle-x',

          // class: ''
          color: 'grey-light',
          width: '24',
          height: '24',
          variant: 'flat',
        },
      },
    })
  },

  loading (opt) {
    const id = toast.toastOriginal.promise(opt.promise, {
      loading: opt.text || null,
      success: data => !opt.success ? toast.dismiss() : opt.success(data) || toast.dismiss(),
      error: data => !opt.error ? toast.dismiss() : opt.error(data) || toast.dismiss(),
      finally: data => !opt.finally ? toast.dismiss() : opt.finally(data) || toast.dismiss(),
    })
  },
}
</script>

<template>
  <VSonner
    position="top-right"
    visible-toasts="5"  
  />
</template>

<style lang="scss">
[data-type="loading"], [data-type="success"], [data-type="error"] {
  padding: 16px 12px;
  font-size: inherit;
  background-color: #E0F7FA;
  color: #0097A7;
}
[data-sonner-toaster] .card-snackbar .v-card-text {
  // align-items: start !important;
  .v-icon {
    margin-right: 16px !important;
  }
  p {
    padding-top: 8px;
    margin: 0;
    font-size: small;

    ul {
      margin-left: 16px;
      list-style-type: disclosure-closed;

      ul {
        list-style-type: '-   ';
      }
    }
  }
}
</style>
