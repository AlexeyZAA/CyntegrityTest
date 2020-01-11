import Vue from 'vue'
import VueRouter from 'vue-router'
import Taskadd from '../views/Taskadd.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'taskadd',
    component: Taskadd
  }
]

const router = new VueRouter({
  routes
})

export default router
