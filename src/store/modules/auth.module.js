import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

export default {
  namespaced: true,
  state() {
    return {
      user: null,
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return !!state.user
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    async signin({ commit }, { email, password }) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
        commit('setError', null, { root: true })
      } catch (err) {
        commit('setError', err.code, { root: true })
      }
    },
    async signup({ commit }, { email, password }) {
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
        commit('setError', null, { root: true })
      } catch (err) {
        commit('setError', err.code, { root: true })
      }
    },
    async signout({ commit }) {
      try {
        const auth = getAuth()
        await signOut(auth)
        commit('setDate', null, { root: true })
      } catch (err) {
        commit('setError', err.code, { root: true })
      }
    },
  },
}
