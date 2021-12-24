import { createStore } from 'vuex'
import auth from './modules/auth.module'
import methods from './modules/methods.module'

export default createStore({
  state() {
    return {
      events: [],
      eventsForAll:[],
      error: null,
      selectedDate: null,
    }
  },
  getters: {
    error(state) {
      return state.error
    },
    selectedDate(state) {
      return state.selectedDate
    },
    events(state) {
      return state.events
    },
    eventsForAll(state) {
      return state.eventsForAll
    },
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    setDate(state, date) {
      state.selectedDate = date
    },
    setEventsForAll(state, events) {
      state.eventsForAll = events
    },
    setEvents(state, events) {
      state.events = events
    },
  },
  modules: {
    auth,
    methods,
  },
})
