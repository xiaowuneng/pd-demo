import Vue from 'vue'
import VueRouter from 'vue-router'
import Poetry from 'views/poetry'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/poetry'
  },
  {
    path: '/poetry',
    name: 'Poetry',
    meta: { title: '诗词' },
    component: Poetry
  },
  {
    path: '/dynasties',
    name: 'Dynasties',
    meta: { title: '朝代' },
    component: () => import('views/dynasties')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})
export default router
