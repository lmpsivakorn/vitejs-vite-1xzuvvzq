import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import { init, AuthStore } from '@/store/auth'

// Styles
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import liff from '@line/liff'

let loaded = false
const main = async () => {
  console.log('main call')
  const app = createApp(App)

  console.log('init call')
  // const inited = await new Promise(async (resolve, reject) => {
    const timeout = null // setTimeout(() => resolve(false), 30000)
    await init()
      //.then(() => resolve(true))
      //.catch(e => reject(e))
      .finally(() => {
        if (timeout !== null) clearTimeout(timeout)
      })
  // })

  // if(!inited) window.location.href = window.location.href + '?t=' + Date.now()

  registerPlugins(app)

  await (AuthStore()).ready().then(() => console.log('auth ready'))

  app.mount('#app')
  console.log('main end')
  loaded = true
  console.log('main called')
}
document.addEventListener('readystatechange', () => {
  console.log('ready ')
})
let reload = null
main()
  .then(() => {
    if (reload !== null) clearTimeout(reload)
  })
  .catch((e) => {
    console.log('clear data', e)
    if ('indexedDB' in window) {
      indexedDB.databases().then(dbs => {
        dbs.forEach(db => {
          indexedDB.deleteDatabase(db.name);
        });
      });
    }
    // window.location.reload()
  })

liff.ready.catch(async (e) => {
  console.log(e)
  const liffUrl = await liff.permanentLink.createUrlBy(window.location.href)
  window.location.href = liffUrl
})
