import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Master from '../views/Master'
import Allotment from '../views/Allotment'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path : '/allot',
    name : 'Allot',
    component : Allotment
  },
  {
    path : '/master',
    name : 'Master',
    component: Master
  }
]

const router = new VueRouter({
  routes
})

export default router
