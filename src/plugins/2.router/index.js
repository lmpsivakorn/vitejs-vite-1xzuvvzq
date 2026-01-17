import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { redirects, routes } from './additional-routes'
import { setupGuards } from './guards'

function recursiveLayouts(route) {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])
    
    return route
  }
  
  return setupLayouts([route])[0]
}

function mergeRecursive(obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = mergeRecursive(obj1[p], obj2[p])
      } else {
        obj1[p] = obj2[p]
      }
    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p]
    }
  }

  return obj1
}

const router = createRouter({
  // routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash)
      return { el: to.hash, behavior: 'smooth', top: 60 }
    
    return { top: 0 }
  },
  extendRoutes: pages => [
    // ...redirects,
    ...[...pages]
      .map(route => {
        const extRoute = routes.find(extRoute => extRoute.path === route.path || extRoute.name === route.name)
        if (extRoute) {
          return mergeRecursive(route, extRoute)
        }

        return route
      })
      .map(route => recursiveLayouts(route)),
    ...[...routes.filter(route => !pages.find(page => page.path === route.path || page.name === route.name))],
  ],
})

setupGuards(router)
export { router }
export default function (app) {
  app.use(router)
}
