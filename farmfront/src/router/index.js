import Vue from 'vue'
import VueRouter from 'vue-router'
import userTask from '../views/UserTask.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'usertask',
    component: userTask
  }
]

const router = new VueRouter({
  routes
})

export default router
