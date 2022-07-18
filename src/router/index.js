import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home/Home-zujian.vue'
import User from '@/views/User/User-zujian.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/user', component: User }
]

const router = new VueRouter({
  routes
})

export default router
