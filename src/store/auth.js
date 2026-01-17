import { defineStore } from 'pinia'
import liff from '@line/liff'
import { getAuth, onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth'
import { getFunctions, httpsCallable } from "firebase/functions"
import { instanceApp } from '@/plugins/firebase'
import { MemberStore } from '@/store/member'

let isReady = false
let isReading = false

async function sleep (time) {
  await new Promise(function (resolve) { setTimeout(() => resolve(), time) })
}

export const init = async () => {
  // await Promise.all([
  //   new Promise(resolve => {
  //     const un = onAuthStateChanged(getAuth(),
  //       () => resolve(un()),
  //       () => resolve(un()),
  //     )
  //   }),
  //   () => {
  //     return liff.init({
  //       liffId: import.meta.env.PROD ? import.meta.env.VITE_LIFF_ID : import.meta.env.VITE_LIFF_ID_DEV,
  //       // withLoginOnExternalBrowser: true
  //     })
  //   }
  // ]).then(() => console.log('init completed'))

  let liffId = null;
  if (import.meta.env.PROD) {
    if (window.location.href.indexOf('uat') !== -1) {
      liffId = import.meta.env.VITE_LIFF_ID_UAT
    } else {
      liffId = import.meta.env.VITE_LIFF_ID
    }
  } else {
    liffId = import.meta.env.VITE_LIFF_ID_DEV
  }
  // const originalFetch = window.fetch;
  // window.fetch = function(url, options) {
  //   if (url.toString().startsWith('https://liff.line.me/' + liffId) && url.toString().endsWith('.json')) {
  //     url = url + '?ts=' + Math.random();
  //   }
  //   return originalFetch(url, options);
  // };
  await liff.init({ liffId })
    .then(() => console.log('init liff completed'))
  await liff.ready
  const isLineBrowser = window.navigator.userAgent.toLowerCase().includes('LINE')
  if (!liff.isInClient() && isLineBrowser) {
    // if (!liff.isLoggedIn()) {
    //   liff.login()
    // }
    if (liff.isLoggedIn()) {
      const liffUrl = await liff.permanentLink.createUrlBy(window.location.href)
      window.location.href = liffUrl
    }
  }
}

let unListen = null
export const AuthStore = defineStore('auth', {
  state: () => ({
    logged: false,
    firebaseAuthed: false,
    loggedBy: null,
    profile: {
      name: '',
      picture: '',
      telephone: null,
      friendship: false
    },
    tmp: {
      telephone: null,
      verifyId: null,
    },

  }),

  actions: {
    linkCredential (payload) {
      return new Promise((resolve, reject) => {
        httpsCallable(getFunctions(instanceApp), "auth-linkCredential")(payload).then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    getCurrentUser () {
      return new Promise((resolve, reject) => {
        if(!this.logged) return resolve(null)
        this.listen(user => {
          unListen()
          resolve(user)
        })
      })
    },

    listen (call) {
      if (typeof unListen == 'function') unListen()
      unListen = onAuthStateChanged(getAuth(),
        user => {
          if (user !== null) {
            this.logged = true
            this.loggedBy = 'firebaseAuth'

            const { displayName, photoURL, phoneNumber } = user

            Object.assign(this.profile, { name: displayName, picture: photoURL, telephone: phoneNumber })
            MemberStore().snapUser(user.uid)

            if (typeof call === 'function') call(user)
          }
        },
        error => {
          console.error(error)
          if (typeof call === 'function') call(null)
        },
      )
    },

    async waitReady (limit = null) {
      return await new Promise (resolve => {
        const wait = () => {
          if (isReady) return resolve()
          if (typeof limit === "number") {
            limit--
            if (limit === 0) return
          }
          setTimeout(wait, 1000)
        }

        wait()
      })
    },

    async ready() {
      //if (isReady) return

      if (getAuth().currentUser !== null) {
        this.logged = true
        this.loggedBy = 'firebaseAuth'

        const { displayName, photoURL, phoneNumber } = getAuth().currentUser

        const follow = await liff.getFriendship()
        Object.assign(this.profile, {
          name: displayName,
          picture: photoURL,
          telephone: phoneNumber,
          friendship: follow.friendFlag
        })
      } else if(liff.isLoggedIn()) {
        this.logged = true
        this.loggedBy = 'liff'

        const info = liff.getDecodedIDToken()
        const follow = await liff.getFriendship()

        this.profile = {
          name: info.name ?? 'no name',
          picture: info.picture ?? '',
          friendship: follow.friendFlag
        }

        // console.log('debug', { exp: info.exp, now: Date.now() })
        if (info.exp ?? 0 > Date.now() / 1000) {
          const res = await fetch("/api/token", {
            method: "POST",
            body: JSON.stringify({ idToken: liff.getIDToken() }),
          })

          if (!res.ok) throw new Error(await res.text())

          const json = await res.json()
          if (json.error) throw new Error(json.error.message)

          await new Promise(resolve => {
            this.listen(() => {
              unListen()
              resolve()
            })
            signInWithCustomToken(getAuth(instanceApp), json.data.token)
          })
        }
      }
      isReady = true
    },

    login() { liff.login() },

    async logout() {
      await liff.ready
        .then(() => {
          console.log('liff logout')
          liff.logout()
          liff.getAccessToken()
        })

      await signOut(getAuth()).then(() => console.log('firebase logout'))
      Object.assign(this.tmp, {
        telephone: null,
        verifyId: null,
      })
      this.logged = false
      this.loggedBy = null
      MemberStore().user = null
    },

    // async profile () {
    //   try {
    //     if (!this.logged) return null
    //     if (this.profile !== null) return this.profile
    //     if (this.loggedBy === 'liff') {
    //       const info = liff.getDecodedIDToken()
    //       if (info.exp ?? 0 < Date.now() / 1000) return null

    //       const res = await fetch("/api/token", {
    //         method: "POST",
    //         body: JSON.stringify({ idToken: liff.getIDToken() }),
    //       })

    //       if (!res.ok) throw new Error(await res.text())

    //       const json = await res.json()
    //       if (json.error) throw new Error(json.message)

    //       await signInWithCustomToken(getAuth(), json.accessToken)

    //       return this.profile
    //     }

    //     return null
    //   } catch (error){
    //     console.errro(error)

    //     return null
    //   }
    // },
    async requirePage () {
      if (!this.logged) return null
      if (this.profile.telephone === null) {
        if ((this.tmp.telephone ?? '').trim().length === 0) return 'auth-phone-verify'
        else return 'auth-otp-verify'
      }

      return null
    },
  },
})
