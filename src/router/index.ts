import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import MobileCards from '@/views/m-cards.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home,
  // },

  {
    path: '/cards',
    name: 'm-cards',
    component: MobileCards,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
