import { AuthStore } from '@/store/auth'
import liff from '@line/liff'
import { inject } from 'vue'

// import { canNavigate } from '@layouts/plugins/casl'
// import { getActivePinia } from 'pinia'
export const setupGuards = router => {
  // 👉 router.beforeEach
  // Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
  router.beforeEach(async to => {
    console.log(to.path)
    const auth = AuthStore()

    await liff.ready

    if (to.path === '/auth-callback') {
      return '/'
    }

    await auth.waitReady()

    if (to.path === '/logout') {
      await auth.logout()

      return '/'
    }

    const isLoggedIn = await auth.getCurrentUser() // auth.logged
    if (isLoggedIn && !auth.profile?.friendship) {
      await auth.logout()
      if (to.path == '/login') return
      return { path: '/login', query: {unblock: true} }
    }

    const requirePage = await auth.requirePage()
    if (requirePage !== null) {
      if (to.name === requirePage) return

      return { name: requirePage }
    }

    if (to.meta.requirePage) return '/'

    /**
     *
     * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
     * Examples of public routes are, 404, under maintenance, etc.
     */

    /**
     * Check if user is logged in by checking if token & user data exists in local storage
     * Feel free to update this logic to suit your needs
     */
    // const isLoggedIn = !!(useCookie('userData').value && useCookie('accessToken').value)



    /*
    If user is logged in and is trying to access login like page, redirect to home
    else allow visiting the page
    (WARN: Don't allow executing further by return statement because next code will check for permissions)
    */

    // const isLoggedIn = await auth.getCurrentUser() // auth.logged

    // if (isLoggedIn && !auth.profile?.friendship) {
    //   await auth.logout()
    //   if (to.path == '/login') return
    //   return { path: '/login', query: {unblock: true} }
    // }

    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn && to.path === '/') return
      if (isLoggedIn) return '/'
      if (to.path !== '/login') return '/login'

      return
    }

    if (to.meta.public) {
      return
    }

    if (!isLoggedIn) return '/login'

    // if (!canNavigate(to) && to.matched.length) {
    //   console.log('canNavigate failed for route:', to)

    //   /* eslint-disable indent */
    //   return isLoggedIn
    //     ? { name: 'not-authorized' }
    //     : {
    //       name: 'login',
    //       query: {
    //         ...to.query,
    //         to: to.fullPath !== '/' ? to.path : undefined,
    //       },
    //     }
    //   /* eslint-enable indent */
    // }
  })
}
