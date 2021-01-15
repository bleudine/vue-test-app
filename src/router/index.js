import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Team from '../views/Team.vue'
import Types from '@/views/Types'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/pokemon'
  },
  {
    path: '/pokemon',
    name: 'Home',
    component: Home
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/types',
    name: 'Types',
    component: Types
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
