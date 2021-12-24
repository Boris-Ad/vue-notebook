import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { layout: 'main', auth: false },
  },
  {
    path: '/my-dates',
    name: 'MyDates',
    component: () => import('../views/MyDates.vue'),
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/common-dates',
    name: 'CommonDates',
    component: () => import('../views/CommonDates.vue'),
    meta: { layout: 'main', auth: false },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/auth/SignIn.vue'),
    meta: { layout: 'auth', auth: false },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUp.vue'),
    meta: { layout: 'auth', auth: false },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  if (to.meta.auth && isAuthenticated) {
    next()
  } else if (!to.meta.auth) {
    next()
  } else {
    next({ name: 'Home' })
  }
})

export default router
