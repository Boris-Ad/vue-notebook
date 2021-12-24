import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, set, push, update } from 'firebase/database'

export default {
  namespaced: true,
  state() {
    return {}
  },
  getters: {},
  mutations: {},
  actions: {
    addEvent(_, payload) {
      const auth = getAuth()
      onAuthStateChanged(auth, user => {
        if (user) {
          const uid = user.uid
          const db = getDatabase()
          const postListRef = ref(db, 'users/' + uid)
          const newPostRef = push(postListRef)
          const key = newPostRef.key
          set(newPostRef, { id: key, ...payload })
        }
      })
    },
    addEventAll(_, payload) {
      const auth = getAuth()
      onAuthStateChanged(auth, user => {
        if (user) {
          const db = getDatabase()
          const postListRef = ref(db, 'dates/')
          const newPostRef = push(postListRef)
          const key = newPostRef.key
          set(newPostRef, { id: key, ...payload })
        }
      })
    },

    updateEvent(_, payload) {
      const auth = getAuth()
      onAuthStateChanged(auth, user => {
        if (user) {
          const db = getDatabase()
          const uid = user.uid
          update(ref(db, 'users/' + uid + '/' + payload.id), {
            day: payload.day,
            month: payload.month,
            year: payload.year,
          })
        }
      })
    },

    removeEvent(_, id) {
      const auth = getAuth()
      onAuthStateChanged(auth, user => {
        if (user) {
          const db = getDatabase()
          const uid = user.uid
          set(ref(db, 'users/' + uid + '/' + id), null)
        }
      })
    },
  },
}
