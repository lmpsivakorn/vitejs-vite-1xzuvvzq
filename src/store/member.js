import { defineStore } from 'pinia'
import { getFunctions, httpsCallable } from "firebase/functions"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { doc, documentId, getFirestore, collection, query, getDoc, getDocs, onSnapshot, orderBy, limit } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"

// import { subscribe } from 'firebase/data-connect'
import { getMember,getMemberRef } from '@dataconnect/generated'

const functions = getFunctions()
const storage = getStorage()
const firestore = getFirestore()

export const MemberStore = defineStore('member', {

  persist: {
    // paths: ['user'],
    pick: ['user'],
  },

  state: () => ({
    user: null,
    mainActivity: null,
    snapAct: null,
    activities: [],
    courses: [],
    snap: {
      user: null,
      activity: null,
    },
    inform: {
      addressSpecify: false,
    },
  }),

  getters: {
    memberData: state => state.user,
    fullName: state => `${state.user?.firstName || ''} ${state.user?.lastName || ''}`,
    avatar: state => state.user?.avatar || 'https://cdn.uhas.com/no-img.png',
    // avatar: state => `https://cdn.uhas.com/${state.user?.avatar || "no-img.png"}`,

    // coverImage: (state) => state.user?.coverImage ? `https://cdn.uhas.com/${state.user?.coverImage}` : null,
    activity: state => state.mainActivity,
    activityList: state => state.activities,
    courseList: state => state.courses,
    liveActivity: state => state.snapAct,
    memberInform: state => state.inform,
  },

  actions: {
    snapUser (uid) {
      if (this.snap.user) {
        return false
      }
      if (uid) {
        this.snap.user = uid

        onSnapshot(doc(firestore, "members", uid), (doc) => {
          if (!doc.exists()) {            
            return;
          }

          const data = doc.data();
          if (!data) {
            return;
          }

          this.user = data

          // Inform member to specify their address
          if (this.user.country_code === 'TH') { // only Thai people
            this.inform.addressSpecify = !this.user.province_id
          }
        })

        // subscribe(getMemberRef({ uid }), ({ data }) => {
        //   this.user = data?.members?.[0] || null

        //   // Inform member to specify their address
        //   if (this.user.country_code === 'TH') { // only Thai people
        //     this.inform.addressSpecify = !this.user.province_id
        //   }
        // })

        // onValue(dbRef(db, this.snap.user), snapshot => {
        //   this.user = snapshot.val()

        //   // Inform member to specify their address
        //   if (this.user.country_code === 'TH') { // only Thai people
        //     this.inform.addressSpecify = !this.user.province_id
        //   }
        // })
      }
    },

    snapActivity (actId) {
      if (this.snap.activity) {
        return false
      }
      if (actId) {
        this.snap.activity = `/activities/${actId}`

        // onValue(dbRef(db, this.snap.activity), snapshot => {
        //   const data = snapshot.val()
        //   if (data) {
        //     this.snapAct = data

        //     if (this.activities[actId]) {
        //       this.activities[actId] = data
        //     }

        //     if (this.mainActivity?.id === data.id) {
        //       this.mainActivity = { ...this.mainActivity, ...data }
        //     }
        //   }
        // })
      }
    },
    stopSnapActivity () {
      if (this.snap.activity) {
        // off(query(dbRef(db, this.snap.activity)))
        // this.snap.activity = null
      }
    },

    saveBasicInfo (info) {
      return new Promise((resolve, reject) => {
        const { user, newAvatarFile, newCoverFile } = info
        let uuid = null, ext = null, path = null, uploadTasks = []
        if (newAvatarFile) {
          uuid = uuidv4()
          ext = newAvatarFile.type === "image/png" ? ".png" : ".jpg"
          path = `members/${user.uid}/avatar/${uuid.substring(0, 12) + ext}`
          uploadTasks.push(uploadBytes(ref(storage, path), newAvatarFile))

          user.newAvatar = path
        }
        if (newCoverFile) {
          uuid = uuidv4()
          ext = newCoverFile.type === "image/png" ? ".png" : ".jpg"
          path = `members/${user.uid}/cover/${uuid.substring(0, 12) + ext}`
          uploadTasks.push(uploadBytes(ref(storage, path), newCoverFile))

          user.newCoverImage = path
        }
        if (user.birthday && typeof user.birthday === "object") {
          const bd = user.birthday

          user.birthday = `${bd.getFullYear()}-${(bd.getMonth() < 9 ? "0" : "") + (bd.getMonth() + 1)}-${(bd.getDate() < 10 ? "0" : "") + bd.getDate()}`
        }

        Promise.all(uploadTasks)
          .then(() => httpsCallable(functions, "member-updateBasicInfo")({ user }))
          .then(({ data }) => {
            if (data.error) {
              reject(data)
            } else {
              resolve(data)
            }
          })
          .catch(err => reject(err))
      })
    },

    unsubscribeLine () {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-unsubscribeLine")().then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    getExnessAccount (info) {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "exness-getExnessAccount")(info).then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            getMember({ uid: this.user.uid }) // trigger subscription update
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    confirmLinkExnessAccount () {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "exness-confirmLinkExnessAccount")().then(({ data }) => {

          if (data.error) {
            reject(data)
          } else {
            getMember({ uid: this.user.uid }) // trigger subscription update
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    confirmUnlinkExnessAccount () {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "exness-unlinkAccount")().then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            getMember({ uid: this.user.uid }) // trigger subscription update
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    getXmAccount (info) {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-getXmAccountVerify")(info).then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    confirmLinkXmAccount () {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-confirmLinkXmAccount")().then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    getFbsAccount (info) {
      return new Promise((resolve, reject) => {
        // httpsCallable(functions, "member-getFbsAccountVerify")(info).then(({data}) => {
        // 	if (data.error) {
        // 		reject(data);
        // 	} else {
        // 		resolve(data);
        // 	}
        // }).catch(err => reject(err))
        reject(info)
      })
    },

    confirmLinkFbsAccount () {
      return new Promise((resolve, reject) => {
        // httpsCallable(functions, "member-confirmLinkFbsAccount")().then(({data}) => {
        // 	if (data.error) {
        // 		reject(data);
        // 	} else {
        // 		resolve(data);
        // 	}
        // }).catch(err => reject(err))
        reject()
      })
    },

    getHfmAccount (info) {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-getHfmAccountVerify")(info).then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    confirmLinkHfmAccount () {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-confirmLinkHfmAccount")().then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    getFxgtAccount (info) {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-getFxgtAccountVerify")(info).then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    confirmLinkFxgtAccount () {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-confirmLinkFxgtAccount")().then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    getAxiAccount (info) {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-getAxiAccountVerify")(info).then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    confirmLinkAxiAccount () {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-confirmLinkAxiAccount")().then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    getMainActivity () {
      return new Promise((resolve, reject) => {
        if (this.mainActivity) {
          resolve()

          return false
        }

        let q = query(dbRef(db, 'main_activity'))

        get(q).then(snapshot => {
          if (snapshot.size > 0) {
            this.mainActivity = snapshot.val()
          }
          resolve()
        }).catch(err => reject(err))
      })
    },

    getActivityList () {
      return new Promise((resolve, reject) => {
        let q = null
        if (this.activities.length === 0) {
          q = query(dbRef(db, 'activities'), orderByKey(), limitToLast(20))
        } else {
          q = query(dbRef(db, 'activities'), orderByKey(), endBefore(this.activities[this.activities.length - 1].id.toString()), limitToLast(20))
        }

        get(q).then(snapshot => {
          if (snapshot.size > 0) {
            this.activities.push(...Object.values(snapshot.val()).reverse())
          }
          resolve()
        }).catch(err => reject(err))
      })
    },

    getCourseList () {
      return new Promise((resolve, reject) => {
        // let q = null;
        // if (this.courses.length === 0) {
        // 	q = query(dbRef(db, 'courses'), orderByKey(), limitToLast(20));
        // } else {
        // 	q = query(dbRef(db, 'courses'), orderByKey(), endBefore(this.courses[this.courses.length - 1].id.toString()), limitToLast(20));
        // }

        // get(q).then(snapshot => {
        // 	if (snapshot.size > 0) {
        // 		this.courses.push(...Object.values(snapshot.val()).reverse());
        // 		console.log(this.courses)
        // 	}
        // 	resolve();
        // }).catch(err => reject(err));

        if (this.courses.length > 0) {
          resolve(this.courses)

          return
        }

        httpsCallable(functions, "member-getCourseList")().then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            if (data.list?.length > 0) {
              this.courses.push(...data.list)
            }
            resolve(data.list)
          }
        }).catch(err => reject(err))
      })
    },

    getCourse (id) {
      return new Promise((resolve, reject) => {
        const course = this.courses.find(item => item.id.toString() === id.toString())
        if (course) {
          resolve(course)

          return
        }

        // const q = query(dbRef(db, `courses/${id}`));
        // get(q).then(snapshot => {
        // 	resolve(snapshot.val());
        // }).catch(err => reject(err));

        this.getCourseList().then(data => {
          if (data.error) {
            reject(data)
          } else {
            resolve(this.courses.find(item => item.id.toString() === id.toString()))
          }
        }).catch(err => reject(err))
      })
    },

    confirmCompete (payload) {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-confirmCompete")({ activity: payload }).then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            // Update user activity registration
            if (this.user?.activities) {
              this.user.activities[`${payload.id}`] = { ...payload }
            } else {
              this.user.activities = {
                [`${payload.id}`]: { ...payload },
              }
            }
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },

    requestFreeEA (payload) {
      return new Promise((resolve, reject) => {
        httpsCallable(functions, "member-requestFreeEA")(payload).then(({ data }) => {
          if (data.error) {
            reject(data)
          } else {
            resolve(data)
          }
        }).catch(err => reject(err))
      })
    },
  },
})
