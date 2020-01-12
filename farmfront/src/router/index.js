import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'user',
    component: user
  }
]

const router = new VueRouter({
  routes
})

export default router
