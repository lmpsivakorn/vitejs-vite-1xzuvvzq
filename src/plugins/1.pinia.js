import { version } from '../../package.json'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export const store = createPinia()

// store.use(context => {
//   let options = {}
//   if (context.options.persist) {
//     options.key = `taokae.my-${context.store.$id}-${version.slice(0, version.length - 2)}.x`
//   }
//   createPersistedState(options)(context)
// })
store.use(createPersistedState({
  key: id => `taokae.co.${id}-${version.slice(0, version.length - 2)}.x`,
}))
export default function (app) {
  app.use(store)
}
