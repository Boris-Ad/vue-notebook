import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import VCalendar from 'v-calendar';
import 'gitart-vue-dialog/dist/style.css'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

initializeApp({
  apiKey: 'AIzaSyDDx2nO6ROy0GXhFt0-0rph789GRvC30t4',
  authDomain: 'my-notebook-6f26c.firebaseapp.com',
  databaseURL: 'https://my-notebook-6f26c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'my-notebook-6f26c',
  storageBucket: 'my-notebook-6f26c.appspot.com',
  messagingSenderId: '615192991713',
  appId: '1:615192991713:web:8c91a983d0515184c9a4a0',
})

const auth = getAuth()
const db = getDatabase()

onAuthStateChanged(auth, user => {
  const forAllEvents = ref(db, 'dates/')
  getData(forAllEvents, 'setEventsForAll')
  if (user) {
    store.commit('auth/setUser', user)
    const uid = user.uid
    const userEvents = ref(db, 'users/' + uid)
    getData(userEvents, 'setEvents')
  } else {
    router.push({ name: 'Home' })
    store.commit('auth/setUser', null)
    store.commit('setEvents', [])
  }
})

function getData(events, method) {
  return onValue(events, snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      store.commit(method, Object.values(data))
    }
  })
}

createApp(App).use(store).use(VCalendar, {}).use(router).mount('#app')
